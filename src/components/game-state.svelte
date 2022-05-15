<script lang="ts">
	export let state: { win: boolean; stale: boolean; resign: boolean; who: string; state: string };
</script>

{#if state.win || state.stale || state.resign}
	<div
		class="w-screen h-screen bg-[black] opacity-1 fixed top-0 left-0 z-[1000] text-[white] flex justify-center items-center flex-col overflow-hidden"
	>
		{#if state.win}
			<h1 class="text-2xl text-orange">{state.who} Won!</h1>
		{/if}
		{#if state.stale}
			<h1 class="text-2xl text-orange">Stalemate!</h1>
		{/if}
		{#if state.resign}
			<h1 class="text-2xl text-orange">{state.who} resigned!</h1>
		{/if}
		<p class="text-xl mt-3">{state.state}</p>
		<button
			class="text-xl mt-5 z-[5000]"
			on:click={() => {
				if (!state.resign) {
					localStorage.clear();
					window.location.reload();
					return;
				}
				localStorage.removeItem('game_id');
				localStorage.removeItem('log');
				window.location.href = '/multi';
			}}>Reset</button
		>
	</div>
{/if}
