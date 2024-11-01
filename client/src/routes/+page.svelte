<script lang="ts">
    import Grid from "$lib/components/Grid.svelte";    
    import { moveRequested } from "$lib/components/players";
    import Loading from "$lib/components/Loading.svelte";
    import { getDojoContext } from "$stores/dojoStores";
    import { currentPlayer } from "$lib/api/player";
  
    let loading = $derived($moveRequested);

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

    <button on:click={createPlayer}>Create Player</button>
</div>
