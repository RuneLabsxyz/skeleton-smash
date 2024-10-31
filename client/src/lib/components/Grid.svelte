<script lang="ts">
    import { HEIGHT, isSet, WIDTH } from "$lib/logic/feltUtils";
    import { testMap } from "../test";
    import Wall from "./cell/Wall.svelte";
</script>

<div class="flex flex-col gap-1 w-min">
    {#each new Array(18) as _, col}
        <div class="flex flex-row gap-1">
            {#each new Array(14) as _, row}
                {#if isSet(testMap, HEIGHT - 1 - col, WIDTH - row)}
                    <Wall />
                {:else}
                    <div class="w-8 aspect-square text-center bg-red-200">
                        x
                    </div>
                {/if}
            {/each}
        </div>
    {/each}
    <div class="h-8 bg-gray-200 flex items-center justify-center">
        SAFE ZONE
    </div>
</div>
