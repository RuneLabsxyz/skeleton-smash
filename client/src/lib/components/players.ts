import { writable } from "svelte/store";
import { get } from "svelte/store";
import { fakeMoveRequest } from "../test";

export let playerPosition = writable(15);

export let moveRequested = writable(false);

export enum Direction {
    North = -14,
    South = 14,
    West = -1,
    East = 1
}

export async function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
        case "ArrowUp":
            await movePlayer(Direction.North);
            break;
        case "ArrowDown":
            await movePlayer(Direction.South);
            break;
        case "ArrowLeft":
            await movePlayer(Direction.West);
            break;
        case "ArrowRight":
            await movePlayer(Direction.East);
            break;
    }
}

async function movePlayer(direction: Direction) {
    if (get(moveRequested)) {
        return;
    }
    moveRequested.set(true);
    await fakeMoveRequest(direction);
}

