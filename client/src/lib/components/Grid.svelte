<script lang="ts">
    import { HEIGHT, isSet, WIDTH } from "$lib/logic/feltUtils";
    import { testPlayers } from "../test";
    import Wall from "./cell/Wall.svelte";
    import Player from "./cell/Player.svelte";
    import { playerStartPosition, handleKeydown } from "./players";
    import { onMount } from "svelte";
    import { type Felt } from "$lib/logic/feltUtils";
    import { type Run, type Room, type Position } from "$src/dojo/models.gen";
    import {
        currentPlayerPosition,
        otherPlayerPositions,
    } from "$lib/api/position";
    import { currentPlayerRun, isMovePending } from "$lib/api/run";
    import { currentPlayer } from "$lib/api/player";

    let { map, run, room, shake } = $props<{
        map: Felt | null;
        run: Run | null;
        shake: boolean;
    }>();

    onMount(() => {
        const unsubscribe = window.addEventListener("keydown", handleKeydown);

        return unsubscribe;
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

<div
    class={"flex flex-col gap-1 w-min border-2 border-gray-200 game-grid relative isolate " +
        (shake ? "shake shake-constant" : "")}
>
    {#if ($currentPlayerRun?.move_count as number) > 0 || $isMovePending}
        <Player current={true} position={$currentPlayerPosition} />
    {/if}

    {#each Object.entries(($otherPlayerPositions as Record<string, Position> | null) ?? {}) as pos}
        {#if Number(pos[0]) !== $currentPlayerRun?.run_id}
            <Player current={false} position={pos[1]} />
        {/if}
    {/each}

    {#each new Array(18) as _, col}
        <div class="flex flex-row gap-1">
            {#each new Array(14) as _, row}
                {#if isSet(map, HEIGHT - 1 - col, row + 1)}
                    <Wall />
                {:else}
                    <div class="w-[var(--grid-width)] aspect-square"></div>
                {/if}
            {/each}
        </div>
    {/each}
    <div class="h-[var(--grid-width)] bg-gray-200 flex items-center justify-center relative">
        SAFE ZONE
        {#if $currentPlayerPosition === null}
            <div
                class="w-[var(--grid-width)] aspect-square bg-red-500"
                style="position: absolute; left: calc({$playerStartPosition} * var(--grid-width));"
            ></div>
        {/if}
    </div>
</div>

<style>
    :root {
        --grid-width: 2.5rem;
    }
    .game-grid {
        background: url("/assets/bg.png");
        background-size: var(--grid-width);
    }
</style>
