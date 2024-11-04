<script lang="ts">
    import { HEIGHT, isSet, WIDTH } from "$lib/logic/feltUtils";
    import { testPlayers } from "../test";
    import Wall from "./cell/Wall.svelte";
    import Player from "./cell/Player.svelte";
    import {
        playerStartPosition,
        handleKeydown,
        handleTouchStart,
        handleTouchEnd,
    } from "./players";
    import { onMount, onDestroy } from "svelte";
    import { type Felt } from "$lib/logic/feltUtils";
    import { type Run, type Room, type Position } from "$src/dojo/models.gen";
    import Background from "$lib/components/ui/Background.svelte";
    import {
        currentPlayerPosition,
        otherPlayerPositions,
        type PositionStatus,
    } from "$lib/api/position";
    import { currentPlayerRun, isMovePending, Run as RunStore } from "$lib/api/run";
    import Bones from "./cell/Bones.svelte";
    import Trap from "./cell/Trap.svelte";

    let { map, run, room, shake, death_walls, level } = $props<{
        map: Felt | null;
        run: Run | null;
        shake: boolean;
        death_walls: Felt | null;
        level: number;
    }>();

    onMount(() => {
        window.addEventListener("keydown", handleKeydown);
        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchend", handleTouchEnd);

        return () => {
            window.removeEventListener("keydown", handleKeydown);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    });
</script>


<div
    class="flex flex-col gap-1 w-min border-2 border-gray-200 relative isolate game-grid" 
    style="background-position: 50% calc(100% - ({Math.min(level, 9)} * 11.1%));"
>
    {#if ($currentPlayerRun?.move_count as number) > 0 || $isMovePending}
        <Player current={true} position={$currentPlayerPosition} isMoving={$isMovePending ?? false} />
    {/if}

    {#each Object.entries(($otherPlayerPositions as Record<string, PositionStatus> | null) ?? {}) as pos}
        {#if Number(pos[0]) !== $currentPlayerRun?.run_id}
            {#if pos[1].dead}
                <Bones position={pos[1]} />
            {:else}
                <Player current={false} position={pos[1]} />
            {/if}
        {/if}
    {/each}

    {#each new Array(18) as _, col}
        <div class="flex flex-row gap-1">
            {#each new Array(14) as _, row}
                {#if isSet(map, HEIGHT - 1 - col, row + 1)}
                    <Wall />
                {:else if !isSet(death_walls, HEIGHT - 1 - col, row + 1) && death_walls !== null}
                    <Trap />
                {:else}
                    <div class="w-[var(--grid-width)] aspect-square"></div>
                {/if}
            {/each}
        </div>
    {/each}
    <div class="h-[var(--grid-width)] bg-gray-200 flex items-center justify-center relative safe-grid">
        {#if ($currentPlayerRun?.move_count as number) == 0}
            <div
                class="w-[var(--grid-width)] aspect-square  flex items-center justify-center"
                style="position: absolute; left: calc({$playerStartPosition} * (var(--grid-width) + 0.25rem));"
            >
                <img
                    src="/assets/player.png"
                    alt="current player"
                    class="w-8 h-8"
                    style="image-rendering: pixelated;"
                />
            </div>
        {/if}
    </div>
</div>

<style>
    :root {
        --grid-width: calc((100vw - (13 * 0.25rem)) / 14); /* Adjust for gaps between cells */
    }
    @media (min-width: 768px) {
        /* For larger screens, you might want to set a maximum grid width */
        :root {
            --grid-width: 2.5rem;
        }
    }
    .game-grid {
        background: url("/assets/full_background.jpg");
        background-size: 100% auto;
    }

    .safe-grid {
        background: url("/assets/safe.png");
        background-size: var(--grid-width);
    }
</style>
