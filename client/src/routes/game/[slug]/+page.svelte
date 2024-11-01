<script lang="ts">
    import Grid from "$lib/components/Grid.svelte";
    import { currentPlayerRoom } from "$lib/api/room";
    import { currentPlayerRun } from "$lib/api/run";
    import { type Run } from "$src/dojo/models.gen";
    import { type Felt } from "$lib/logic/feltUtils";

    let room_map: Felt | null = $state(null);
    let run: Run | null = $state(null);

    currentPlayerRoom.subscribe((e) => {
        room_map = e?.map ? { val: BigInt(String(e.map)) } : null;
    });

    currentPlayerRun.subscribe((e) => {
        run = e;
    });

</script>

<div class="w-screen flex h-screen justify-center items-center flex-col">
    <h1 class="font-bold text-3xl mb-5">Skeleton Bash</h1>
    {#if room_map}
        <Grid map={room_map}></Grid>
    {/if}
</div>