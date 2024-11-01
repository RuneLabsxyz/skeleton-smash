<script lang="ts">
    import Grid from "$lib/components/Grid.svelte";
    import { moveRequested } from "$lib/components/players";
    import Loading from "$lib/components/Loading.svelte";
    import { getDojoContext } from "$stores/dojoStores";
    import { currentPlayer } from "$lib/api/player";

    let loading = $derived($moveRequested);

    import { currentPlayerRun, startRun } from "$lib/api/run";
    import { currentPlayerRoom } from "$lib/api/room";

    currentPlayerRoom.subscribe((e) => console.log("room: ", e));
</script>

<div class="w-screen flex h-screen justify-center items-center flex-col">
    <h1 class="font-bold text-3xl mb-5">
        Skeleton Bash ({$currentPlayer?.contract_address})
    </h1>
    <Grid></Grid>

    <span>
        Working on runId: {$currentPlayerRun?.run_id}, so we are in the room {$currentPlayerRun?.room_id}
    </span>
    <span>
        The room {$currentPlayerRoom?.room_id} exists, and we have the following
        players in it: {JSON.stringify(
            $currentPlayerRoom?.player_ids.map(
                (e) => "0x" + e.toString(16).slice(0, 5) + "...",
            ),
        )}
    </span>
    <button onclick={() => startRun()}>Start a run</button>
</div>

<div
    class="absolute top-0 right-0 w-screen h-screen flex justify-end items-start p-4"
>
    {#if loading}
        <Loading />
    {/if}
</div>
