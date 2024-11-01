<script>
    import { currentPlayerRun, startRun } from "$lib/api/run";
    import { currentPlayerRoom } from "$lib/api/room";

    currentPlayerRoom.subscribe((e) => console.log("room: ", e));

    async function startGame() {
        await startRun();
    }
</script>

<button on:click={startGame}>Start Game</button>
