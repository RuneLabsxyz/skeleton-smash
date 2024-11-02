<script lang="ts">
    import { HEIGHT, isSet, WIDTH } from "$lib/logic/feltUtils";
    import { testPlayers } from "../test";
    import Wall from "./cell/Wall.svelte";
    import Player from "./cell/Player.svelte";
    import { playerPosition, handleKeydown } from "./players";
    import { onMount } from "svelte";
    import { type Felt } from "$lib/logic/feltUtils";
    import { type Run } from "$src/dojo/models.gen";

    let player = $derived($playerPosition);

    let playerStartPosition: number | null = $state(null);

    let { map, run } = $props<{
        map: Felt | null;
        run: Run | null;
    }>();

    $effect(() => {
        if (run) {
            playerStartPosition = 7;
        }
    });

    onMount(() => {
        window.addEventListener("keydown", handleKeydown);
    });
</script>

<div class="flex flex-col gap-1 w-min border-2 border-gray-200">
    {#each new Array(18) as _, col}
        <div class="flex flex-row gap-1">
            {#each new Array(14) as _, row}
                {#if isSet(map, HEIGHT - 1 - col, WIDTH - row)}
                    <Wall />
                {:else if isSet(testPlayers, HEIGHT - 1 - col, WIDTH - row)}
                    <Player current={false} />
                {:else if player === col * WIDTH + row}
                    <Player current={true} />
                {:else}
                    <div class="w-8 aspect-square">
                    </div>
                {/if}
            {/each}
        </div>
    {/each}
    <div class="h-8 bg-gray-200 flex items-center justify-center relative">
        SAFE ZONE
        {#if playerStartPosition !== null}
            <div 
                class="w-8 aspect-square bg-red-500" 
                style="position: absolute; left: calc({playerStartPosition} * 2.25rem);"
            >
            </div>
        {/if}
    </div>    
</div>
