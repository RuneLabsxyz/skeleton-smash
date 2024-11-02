<script lang="ts">
    import { HEIGHT, isSet, WIDTH } from "$lib/logic/feltUtils";
    import { testPlayers } from "../test";
    import Wall from "./cell/Wall.svelte";
    import Player from "./cell/Player.svelte";
    import { playerPosition, playerStartPosition, handleKeydown } from "./players";
    import { onMount } from "svelte";
    import { type Felt } from "$lib/logic/feltUtils";
    import { type Run } from "$src/dojo/models.gen";
    import { currentPlayerPosition } from "$lib/api/position";

    let player = $derived($playerPosition);
    let playerStart = $derived($playerStartPosition);

    currentPlayerPosition.subscribe((e) => {
        if (e) {
            playerPosition.set(e.pos);
        }
    });

    let { map, run } = $props<{
        map: Felt | null;
        run: Run | null;
    }>();

    $effect(() => {
        if (run.move_count == 0) {
            playerStartPosition.set(7);
        } else {
            playerStartPosition.set(null);
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
                {:else if $playerPosition === (HEIGHT - 1 - col) * WIDTH + row}
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
        {#if playerStart !== null}
            <div 
                class="w-8 aspect-square bg-red-500" 
                style="position: absolute; left: calc({playerStart} * 2.25rem);"
            >
            </div>
        {/if}
    </div>    
</div>
