<script lang="ts">
    import Grid from "$lib/components/Grid.svelte";
    import Ui from "$lib/components/Ui.svelte";
    import { currentPlayerRoom } from "$lib/api/room";
    import { currentPlayer } from "$lib/api/player";
    import { currentPlayerRun, isMovePending } from "$lib/api/run";
    import { type Run, type Room } from "$src/dojo/models.gen";
    import { type Felt } from "$lib/logic/feltUtils";
    import Background from "$lib/components/ui/Background.svelte";

    let room_map: Felt | null = $state(null);
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

    currentPlayerRun.subscribe((e) => {
        run = e;
        currentLevel = Number(e?.level ?? 0);

        if (e) {
            const { pathname } = window.location;
            const currentRunId = pathname.split("/").pop();

            if (currentRunId !== String(e.run_id)) {
                window.history.replaceState({}, "", `/game/${e.run_id}`);
            }
        }
    });
</script>

<div class="w-screen flex h-screen justify-center items-center flex-col">
    <h1 class="font-bold text-3xl mb-5">Skeleton Bash</h1>
    {#if room_map}
        <Grid map={room_map} {run} shake={$isMovePending}></Grid>
    {/if}

    <Ui {run} {isDead} />
    <Background level={currentLevel} />
</div>
