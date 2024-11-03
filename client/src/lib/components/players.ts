import { derived, writable, type Readable } from "svelte/store";
import { get } from "svelte/store";
import { fakeMoveRequest } from "../test";
import { currentPlayerRun, doFirstMove, doMove, isMovePending } from "$lib/api/run";
import { currentPlayerPosition } from "$lib/api/position";

export let playerStartPosition = writable<number | null>(7);


export let moveRequested = writable(false);

export enum Direction {
    None,
    North,
    East,
    South,
    West,
}

export async function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
        case "ArrowUp":
            await movePlayer(Direction.North);
            break;
        case "ArrowRight":
            await movePlayer(Direction.East);
            break;
        case "ArrowDown":
            await movePlayer(Direction.South);
            break;
        case "ArrowLeft":
            await movePlayer(Direction.West);
            break;
    }
}

async function movePlayer(direction: Direction) {
    if (get(isMovePending)) {
        console.log("Move is pending!")
        return;
    }

    if (get(currentPlayerRun)?.move_count == 0) {
        await spawnPlayer(direction);
        return;
    }

    // if (get(moveRequested)) {
    //     return;
    // }
    moveRequested.set(true);
    console.log("Moving in direction: ", direction);
    await doMove(direction);
}

async function spawnPlayer(direction: Direction) {
    const startPos = get(playerStartPosition);
    if (startPos === null) {
        return;
    }
    if (direction === Direction.East) {
        playerStartPosition.set(Math.min(13, startPos + 1));
    } else if (direction === Direction.West) {
        playerStartPosition.set(Math.max(0, startPos - 1));
    } else if (direction === Direction.North) {
        doFirstMove(startPos);
    }
}
