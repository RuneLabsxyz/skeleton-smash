<script lang="ts">
    let { level } = $props<{ level: number }>();
</script>

<div
    class="absolute top-4 left-4 text-xl font-bold flex border-2 p-2 bg-[#4F6660] border-black"
>
    <img
        src="/assets/level.svg"
        alt="Level icon"
        class="w-8 ml-2"
        style="image-rendering: pixelated;"
    />

    <div
        class=" text-white px-4 py-2 rounded-md"
        contextmenu="Commit Seppuku"
    >
        Level {level}
    </div>
</div>
