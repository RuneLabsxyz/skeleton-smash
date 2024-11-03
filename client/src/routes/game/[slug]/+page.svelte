<script lang="ts">
    import Grid from "$lib/components/Grid.svelte";
    import Ui from "$lib/components/Ui.svelte";
    import { currentPlayerRoom } from "$lib/api/room";
    import { currentPlayerRun } from "$lib/api/run";
    import { currentPlayer } from "$lib/api/player";
    import { type Run, type Room } from "$src/dojo/models.gen";
    import { type Felt } from "$lib/logic/feltUtils";
    import Background from "$lib/components/ui/Background.svelte";

    let room_map: Felt | null = $state(null);
    let run: Run | null = $state(null);
    let room: Room | null = $state(null);
    let isDead = $state(false);

    currentPlayer.subscribe((e) => {
        if (e?.run_id == 0) {
            isDead = true;
        }
    });

    currentPlayerRoom.subscribe((e) => {
        room_map = e?.map ? { val: BigInt(String(e.map)) } : null;
        room = e;
        console.log("room", room);
    });

    currentPlayerRun.subscribe((e) => {
        run = e;
        if (e) {
            const { pathname } = window.location;
            const currentRunId = pathname.split('/').pop();
            
            if (currentRunId !== String(e.run_id)) {
                window.history.replaceState({}, '', `/game/${e.run_id}`);
            }
        }
    });

    let currentLevel = $state(0);
</script>

<div class="w-screen flex h-screen justify-center items-center flex-col">
    <h1 class="font-bold text-3xl mb-5">Skeleton Bash</h1>
    {#if room_map}
        <Grid map={room_map} {run}></Grid>
    {/if}
    <Ui {run} {isDead} />
    <button
        class="z-10"
        onclick={() => {
            currentLevel++;
            console.log("currentLevel:", currentLevel);
        }}>Test</button
    >
    <Background level={currentLevel} />
</div>
