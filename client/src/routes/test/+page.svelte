<script>
    import { currentPlayerRun, startRun, doFirstMove } from "$lib/api/run";
    import { currentPlayerRoom } from "$lib/api/room";

    currentPlayerRoom.subscribe((e) => console.log("room: ", e));

    async function startGame() {
        await startRun();
    }

    async function firstMove() {
        await doFirstMove(1);
    }
</script>

<button onclick={startGame}>Start Game</button>

<button onclick={firstMove}>Do the first move</button>
