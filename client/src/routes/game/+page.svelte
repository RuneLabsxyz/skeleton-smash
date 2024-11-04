<script lang="ts">
    import { startRun } from "$lib/api/run";
    import { currentPlayerRoom } from "$lib/api/room";
    import Background from "$lib/components/ui/Background.svelte";

    let roomId = $state<Number | null>(null);

    currentPlayerRoom.subscribe((e) => {
        roomId = e?.room_id ?? null;
    });

    $effect(() => {
        if (roomId == null) return;
        window.location.href = `/game/${roomId}`;
    });

    function startGame() {
        startRun();
    }
</script>

<div class="w-screen h-screen flex justify-center items-center z-20 relative">
    <button onclick={startGame} class="text-xl font-bold px-8 py-4 bg-[#4F6660] text-white border-2 border-black hover:bg-[#3D514C]">Start Game</button>
</div>

<div class="absolute top-0 left-1/3 w-1/3 h-screen grid grid-cols-5 grid-rows-[repeat(20,1fr)] gap-0 z-10">
    {#each Array(100) as _}
        <div class="w-full h-full bg-center bg-cover" style="background-image: url('/bg/wall.jpg')"></div>
    {/each}
</div>


<Background />