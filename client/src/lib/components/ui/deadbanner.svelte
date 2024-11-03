<script lang="ts">
    import { currentPlayerRun } from "$lib/api/run";
</script>

<div class="w-full h-1/4 bg-red-800/50 flex items-center justify-center">
    <div
        class="container mx-auto px-4 text-center text-white flex flex-col items-center"
    >
        <img
            src="/assets/dead.png"
            alt="Death icon"
            class="w-16"
            style="image-rendering: pixelated;"
        />
        <div class="font-bold text-4xl">The end?</div>
        <div>
            You died on floor
            <span class="font-bold">
                {$currentPlayerRun?.level}
            </span>
        </div>
        <button
            class="bg-white text-black px-4 py-2 rounded-md mt-4 text-2xl"
            onclick={() => {
                window.location.href = "/game";
            }}
        >
            Try again?
        </button>
    </div>
</div>
