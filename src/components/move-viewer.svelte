<script lang="ts">
	import { db } from '../user';

	import { log } from '../log';
	import { browser } from '$app/env';

	let el: HTMLDivElement;
	let viewableLog: Array<Array<string>> = [];
	export let multi: boolean = false;

	if (log && !multi) {
		log.subscribe((l: Array<Array<string>>) => {
			viewableLog = l;
			if (el) {
				el.scrollIntoView();
			}
		});
	}
	if (browser && multi) {
		db.get(('log_' + localStorage.getItem('game_id')) as string)
			.map()
			.once(async (e) => {
				if (viewableLog) {
					if (viewableLog[viewableLog.length - 1]?.length == 2 || viewableLog.length == 0) {
						viewableLog = [...viewableLog, [e]];
					} else {
						viewableLog[viewableLog.length - 1] = [...viewableLog[viewableLog.length - 1], e];
					}
				}
			});
	}
</script>

<div class="font-mono relative h-fit flex flex-col-reverse overflow-y-auto w-fit">
	<div bind:this={el}>LOG</div>
	<div>
		{#each viewableLog as line, i}
			<p>{i + 1}. {line}</p>
		{/each}
	</div>
</div>
