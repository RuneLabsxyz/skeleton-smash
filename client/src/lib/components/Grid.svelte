<script lang="ts">
    import { HEIGHT, isSet, WIDTH } from "$lib/logic/feltUtils";
    import { testPlayers } from "../test";
    import Wall from "./cell/Wall.svelte";
    import Player from "./cell/Player.svelte";
    import {
        playerPosition,
        playerStartPosition,
        handleKeydown,
    } from "./players";
    import { onMount } from "svelte";
    import { type Felt } from "$lib/logic/feltUtils";
    import { type Run, type Room } from "$src/dojo/models.gen";
    import {
        currentPlayerPosition,
        otherPlayerPositions,
    } from "$lib/api/position";

    let playerStart = $derived($playerStartPosition);

    currentPlayerPosition.subscribe((e: any) => {
        if (e) {
            playerPosition.set(Number(e.pos));
        }
    });

    let { map, run, room } = $props<{
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

    function isOtherPlayerAtPosition(col: number, row: number): boolean {
        try {
            return Object.values(
                $otherPlayerPositions as Record<string, { pos: number }>,
            ).some((p) => p.pos === (HEIGHT - 1 - col) * WIDTH + row);
        } catch {
            return false;
        }
    }
</script>

<div class="flex flex-col gap-1 w-min border-2 border-gray-200">
    {#each new Array(18) as _, col}
        <div class="flex flex-row gap-1">
            {#each new Array(14) as _, row}
                {#if isSet(map, HEIGHT - 1 - col, row + 1)}
                    <Wall />
                {:else if $playerPosition === (HEIGHT - 1 - col) * WIDTH + row}
                    <Player current={true} />
                {:else if isOtherPlayerAtPosition(col, row)}
                    <Player current={false} />
                {:else}
                    <div class="w-8 aspect-square"></div>
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
            ></div>
        {/if}
    </div>
</div>
