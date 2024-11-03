<script lang="ts">
    import { fromOffset } from "$lib/logic/feltUtils";
    import type { Position } from "$src/dojo/models.gen";

    const { position } = $props<{
        position: Position | null;
    }>();

    const pos = $derived(fromOffset(position?.pos ?? 0));
</script>

{#if pos !== null}
    <div
        class="w-[var(--grid-width)] aspect-square flex justify-center items-center align-middle absolute z-30"
        style={`bottom: calc((var(--grid-width) + 0.25rem) * ${pos[0] + 1}); left: calc((var(--grid-width) + 0.25rem) * ${pos[1]})`}
    >
        <img
            src="/assets/tomb.png"
            alt="current player"
            class="w-8"
            style="image-rendering: pixelated;"
        />
    </div>
{/if}
