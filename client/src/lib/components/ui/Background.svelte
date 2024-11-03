<script lang="ts">
    import { tweened } from "svelte/motion";

    let { level } = $props<{
        level: number | undefined;
    }>();

    let larpedLevel = tweened(level);

    let style = $derived(
        `object-position: 50% calc(100% - (${$larpedLevel} * 11.1%));`,
    );

    $effect(() => {
        $larpedLevel = Math.min(level, 9);
    });
</script>

<div class="absolute top-0 left-0 w-screen h-screen -z-10 overflow-hidden">
    <img
        src="/assets/full_background.jpg"
        class="w-screen h-screen object-cover"
        alt="Background image"
        {style}
        aria-hidden="true"
    />
</div>
