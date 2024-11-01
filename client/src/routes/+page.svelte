<script lang="ts">
    import Grid from "$lib/components/Grid.svelte";

    import { getDojoContext } from "$stores/dojoStores";

    async function setup() {
        let dojo = await getDojoContext();
    }
</script>

<div class="w-screen flex h-screen justify-center items-center flex-col">
    <h1 class="font-bold text-3xl mb-5">Skeleton Bash</h1>
    <Grid></Grid>
</div>
