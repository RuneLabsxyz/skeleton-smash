<script lang="ts">
    let { level } = $props<{ level: number }>();
</script>

<div
    class="absolute top-0 left-0 text-xl font-bold bg rounded-br-lg pt-4 pl-4 pr-4 pb-4"
>
    Level {level}
</div>

<style>
    .bg {
        background: url("/assets/bg.png");
        background-size: var(--grid-width);
    }
</style>
