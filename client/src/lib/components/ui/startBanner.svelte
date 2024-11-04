<div class="w-full h-1/4 bg-red-800/50 flex items-center justify-center">
    <div class="container mx-auto px-4 text-center text-white text-4xl">
        {#if window.matchMedia("(pointer: coarse)").matches}
            Swipe the screen to move
        {:else}
            Use the arrow keys to move
        {/if}
    </div>
</div>
