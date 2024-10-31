<script lang="ts">
    let { current } = $props<{
        current: boolean;
    }>();
</script>

{#if current}
    <div class="w-8 aspect-square text-center bg-green-600">y</div>
{:else}
    <div class="w-8 aspect-square text-center bg-cyan-500">o</div>
{/if}
