<script lang="ts">
    import Grid from "$lib/components/Grid.svelte";
    import Ui from "$lib/components/Ui.svelte";
    import { currentPlayerRoom } from "$lib/api/room";
    import { currentPlayer } from "$lib/api/player";
    import {
        currentPlayerRun,
        isMovePending,
        Run as RunStore,
    } from "$lib/api/run";
    import { type Run, type Room } from "$src/dojo/models.gen";
    import { type Felt } from "$lib/logic/feltUtils";
    import Background from "$lib/components/ui/Background.svelte";
    import { get } from "svelte/store";

    let room_map: Felt | null = $state(null);
    let death_walls: Felt | null = $state(null);
    let run: Run | null = $state(null);
    let room: Room | null = $state(null);
    let isDead = $state(false);
    let currentLevel = $state(0);

    currentPlayer.subscribe((e) => {
        if (e?.run_id == 0) {
            isDead = true;
        }
    });

    currentPlayerRoom.subscribe((e) => {
        room_map = e?.map ? { val: BigInt(String(e.map)) } : null;
        death_walls = e?.death_walls
            ? { val: BigInt(String(e.death_walls)) }
            : null;
        room = e;
        console.log("room", room);
        if (e) {
            const { pathname } = window.location;
            const currentRunId = pathname.split("/").pop();

            if (currentRunId !== String(e.room_id)) {
                window.history.replaceState({}, "", `/game/${e.room_id}`);
            }
        }
    });

    currentPlayerRun.subscribe(async (e) => {
        const { pathname } = window.location;
        const currentRunId = pathname.split("/").pop();

        if (e == null) {
            // Handle the case where runs are not enabled
            run = get(await RunStore(Number(pathname.split("/").pop())));
        } else {
            run = e;
        }

        currentLevel = Number(run?.level ?? 0);

        if (e) {
            if (currentRunId !== String(e.run_id)) {
                window.history.replaceState({}, "", `/game/${e.run_id}`);
            }
        }
    });
</script>

<div
    class="w-screen flex h-screen justify-center items-center flex-col touch-none overscroll-none overflow-clip"
>
    <h1
        class="font-bold text-5xl mb-5 font-halloween text-white md:mt-0 mt-auto"
    >
        Skeleton Bash
    </h1>
    {#if room_map}
        <Grid
            map={room_map}
            {run}
            {death_walls}
            shake={$isMovePending}
            level={currentLevel}
        ></Grid>
    {/if}

    <Ui {run} {isDead} />
    <Background />
</div>
