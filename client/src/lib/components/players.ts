import { writable } from "svelte/store";
import { get } from "svelte/store";

export let playerPosition = writable(15);

enum Direction {
    North = -14,
    South = 14,
    West = -1,
    East = 1
}

function movePlayer(direction: Direction) {
    playerPosition.set(get(playerPosition) + direction);
}

export function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
        case "ArrowUp":
            movePlayer(Direction.North);
            break;
        case "ArrowDown":
            movePlayer(Direction.South);
            break;
        case "ArrowLeft":
            movePlayer(Direction.West);
            break;
        case "ArrowRight":
            movePlayer(Direction.East);
            break;
    }
}