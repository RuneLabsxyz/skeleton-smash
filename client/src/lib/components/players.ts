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

// Touch event variables
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

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

export function handleTouchStart(event: TouchEvent) {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
}

export function handleTouchEnd(event: TouchEvent) {
    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;
    handleGesture();
}

function handleGesture() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    const minSwipeDistance = 30; // Minimum distance in pixels to consider it a swipe

    if (absDeltaX < minSwipeDistance && absDeltaY < minSwipeDistance) {
        // Not a valid swipe
        return;
    }

    if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0) {
            // Swipe right
            movePlayer(Direction.East);
        } else {
            // Swipe left
            movePlayer(Direction.West);
        }
    } else {
        // Vertical swipe
        if (deltaY > 0) {
            // Swipe down
            movePlayer(Direction.South);
        } else {
            // Swipe up
            movePlayer(Direction.North);
        }
    }
}

async function movePlayer(direction: Direction) {
    if (get(isMovePending)) {
        console.log("Move is pending!");
        return;
    }

    if (get(currentPlayerRun)?.move_count == 0) {
        await spawnPlayer(direction);
        return;
    }

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
