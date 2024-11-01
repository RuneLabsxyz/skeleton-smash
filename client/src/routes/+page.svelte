<script lang="ts">
    import Grid from "$lib/components/Grid.svelte";    
    import { moveRequested } from "$lib/components/players";
    import Loading from "$lib/components/Loading.svelte";

    let loading = $derived($moveRequested);
</script>

<div class="w-screen flex h-screen justify-center items-center flex-col">
    <Grid />
</div>
<div class="absolute top-0 right-0 w-screen h-screen flex justify-end items-start p-4">
    {#if loading}
        <Loading />
    {/if}
</div>
