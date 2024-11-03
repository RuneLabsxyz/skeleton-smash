<script lang="ts">
    import { fromOffset } from "$lib/logic/feltUtils";
    import type { Position } from "$src/dojo/models.gen";
    import { tweened } from "svelte/motion";
    import { SvelteURL } from "svelte/reactivity";
    import { get, type Readable } from "svelte/store";

    let { current, position } = $props<{
        current: boolean;
        position: Position | null;
    }>();

    let previousValue = $state(null);

    $effect(() => {
        if (position?.pos != null) {
            previousValue = position.pos;
        }
    });

    let posStore: [number, number] = $derived(
        fromOffset((position?.pos ?? previousValue ?? -1) as number),
    );

    let pos = $state(tweened<[number, number] | null>(null));

    $effect(() => {
        if ((position?.pos ?? previousValue) != null) {
            pos.set(posStore);
        }
    });
</script>

{#if $pos !== null}
    <div
        class="w-[var(--grid-width)] aspect-square flex justify-center items-center align-middle absolute z-30"
        style={`bottom: calc((var(--grid-width) + 0.25rem) * ${$pos[0] + 1}); left: calc((var(--grid-width) + 0.25rem) * ${$pos[1]})`}
    >
        {#if current}
            <img
                src="/assets/player.png"
                alt="current player"
                class="w-8"
                style="image-rendering: pixelated;"
            />
        {:else}
            <img
                src="/assets/other.png"
                alt="current player"
                class="w-8"
                style="image-rendering: pixelated;"
            />
        {/if}
    </div>
{/if}
