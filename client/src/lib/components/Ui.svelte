<script lang="ts">
    import StartBanner from "./ui/startBanner.svelte";
    import { currentPlayerRun } from "$lib/api/run";
    import { type Run } from "$src/dojo/models.gen";
    import Background from "./ui/Background.svelte";
    import Level from "./ui/Level.svelte";
    import DeadBanner from "./ui/deadbanner.svelte";
    let { run, isDead } = $props<{
        run: Run | null;
        isDead: boolean;
    }>();

</script>

<div class="absolute top-0 left-0 w-full h-full flex items-center">
    {#if run?.move_count == 0}
        <StartBanner />
    {/if}
    {#if run}
        <Level level={run.level} />
    {/if}
    {#if isDead}
        <DeadBanner />
    {/if}
</div>
