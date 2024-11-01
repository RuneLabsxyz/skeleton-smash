<script lang="ts">
    import { currentPlayerRun, startRun } from "$lib/api/run";
    import { currentPlayerRoom } from "$lib/api/room";


    let roomId: Number | null = $state(null);

    currentPlayerRoom.subscribe((e) => {
        roomId = e?.room_id ?? null;
    });

    $effect(() => {
        if (roomId == null) return;
        window.location.href = `/game/${roomId}`;
    })

    async function startGame() {
        await startRun();
    }

</script>



<button on:click={startGame}>Start Game</button>