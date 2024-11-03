<script lang="ts">
    import Grid from "$lib/components/Grid.svelte";
    import Ui from "$lib/components/Ui.svelte";
    import { currentPlayerRoom } from "$lib/api/room";
    import { currentPlayerRun } from "$lib/api/run";
    import { type Run, type Room } from "$src/dojo/models.gen";
    import { type Felt } from "$lib/logic/feltUtils";

    let room_map: Felt | null = $state(null);
    let run: Run | null = $state(null);
    let room: Room | null = $state(null);

    currentPlayerRoom.subscribe((e) => {
        room_map = e?.map ? { val: BigInt(String(e.map)) } : null;
        room = e;
    });

    currentPlayerRun.subscribe((e) => {
        run = e;
    });

</script>

<div class="w-screen flex h-screen justify-center items-center flex-col">
    <h1 class="font-bold text-3xl mb-5">Skeleton Bash</h1>
    {#if room_map}
        <Grid map={room_map} run={run} room={room}></Grid>
    {/if}
    <Ui run={run} />
</div>