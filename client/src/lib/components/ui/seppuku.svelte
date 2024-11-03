<script lang="ts">
    import { commitSeppuku } from "$lib/api/run";
</script>

<div
    class="absolute top-4 right-4 text-xl font-bold flex border-2 p-2 bg-[#4F6660] border-black hover:bg-[#6D917A]"
>
    <img
        src="/assets/sacrifice.png"
        alt="Sacrifice icon"
        class="w-8 ml-2"
        style="image-rendering: pixelated;"
    />

    <button
        class=" text-white px-4 py-2 rounded-md"
        onclick={commitSeppuku}
        contextmenu="Commit Seppuku">Sacrifice</button
    >
</div>
