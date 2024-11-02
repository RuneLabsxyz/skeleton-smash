<script lang="ts">
    import StartBanner from "./ui/startBanner.svelte";
    import { currentPlayerRun } from "$lib/api/run";
    import { type Run } from "$src/dojo/models.gen";


    let { run } = $props<{
        run: Run | null;
    }>();
    
</script>


<div class="absolute top-0 left-0 w-full h-full flex items-center">
    {#if run?.move_count == 0}
        <StartBanner />
    {/if}
</div>