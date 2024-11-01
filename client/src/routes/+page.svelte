<script lang="ts">
    import Grid from "$lib/components/Grid.svelte";

    import { getDojoContext } from "$stores/dojoStores";
    import { currentPlayer } from "$lib/api/player";

    currentPlayer.subscribe((val) => {
        console.log("Got value!", val);
    });

    function createPlayer() {
        
    }
</script>

<div class="w-screen flex h-screen justify-center items-center flex-col">
    <h1 class="font-bold text-3xl mb-5">
        Skeleton Bash ({$currentPlayer?.contract_address})
    </h1>
    <Grid></Grid>

    <div onclick={() => }></div>
</div>
