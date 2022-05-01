<script>
    export let state;
</script>

{#if state.win || state.stale}
    <div
        class="w-screen h-screen bg-[black] opacity-1 absolute z-50 text-[white] flex justify-center items-center flex-col"
    >
        {#if state.win}
            <h1 class="text-2xl">{state.who} Won!</h1>
        {/if}
        {#if state.stale}
            <h1 class="text-2xl">Stalemate!</h1>
        {/if}
        <p class="text-xl mt-3">{state.state}</p>
        <button
            class="text-xl mt-5 z-[5000]"
            on:click={() => {
                localStorage.clear();
                window.location.reload();
            }}>Reset</button
        >
    </div>
{/if}
