<script lang="ts">
  import { onMount } from "svelte";

  import { add_log, log } from "../log";

  let el: HTMLDivElement;
  let viewableLog = [];
  let count = 0;

  onMount(() => {
    let logString = localStorage.getItem("log");
    let oldLog = JSON.parse(logString);
    for (let i = 0; i < oldLog.length; i++) {
      add_log(oldLog[i]);
    }
  });
  log.subscribe((l) => {
    viewableLog = l;
    if (el) {
      el.scrollIntoView();
    }
  });
</script>

<div
  class="ml-5 font-mono relative h-96 flex flex-col-reverse overflow-y-auto w-56"
>
  <div bind:this={el}>LOG</div>
  <div>
    {#each viewableLog as line, i}
      <p>{i + 1}. {line}</p>
    {/each}
  </div>
</div>
