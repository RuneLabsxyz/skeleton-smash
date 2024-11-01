import { accountStore, dojoStore, getDojo, getDojoContext } from "$src/stores/dojoStores";
import { derived, writable, type Readable, type Writable } from "svelte/store";
import { currentPlayer } from "./player";
import { dojoConfig } from "$src/dojoConfig";
import { componentValueStore } from "$src/dojo/componentValueStore";
import type { Direction as ModelDirection, Run } from "$src/dojo/models.gen";

const SEED = () => BigInt(Math.random() * 1_000_000);

export async function startRun() {
    // Get the context 
    const [account, { client }] = await getDojoContext();
    try {
        await client.actions.spawn({
            account,
            seed: SEED()
        });
    } catch (err) {
        console.log("An error occurred while spawning: ", err)
    }
}

export async function doFirstMove(column: number) {
    // Get the context 
    const [account, { client }] = await getDojoContext();

    try {
        await client.actions.first_move({
            account,
            chosen_column: column,
            seed: SEED()
        });
    } catch (err) {
        console.log("An error occurred while doing the first move: ", err)
    }
}

enum Direction {
    NONE,
    UP,
    DOWN,
    LEFT,
    RIGHT
}

function getModelValue(direction: Direction): ModelDirection {
    switch (direction) {
        case Direction.NONE:
            return {type: "None"}
        case Direction.UP:
            return {type: "Up"}
        case Direction.DOWN:
            return {type: "Down"}
        case Direction.LEFT:
            return {type: "Left"}
        case Direction.RIGHT:
            return {type: "Right"}
    }
}

export async function doMove(direction: Direction) {
    // Get the context 
    const [account, { client }] = await getDojoContext();

    try {
        await client.actions.move_player({
            account,
            direction: getModelValue(direction),
            seed: SEED()
        });
    } catch (err) {
        console.log("An error occurred while doing the first move: ", err)
    }
}

export async function Run(runId: number) {
    // We consider they are unchangeable
    const { torii, clientComponents } = await getDojo();
    const valueHash = torii.poseidonHash([String(runId)]);

    // return a component value store of the object:
    return componentValueStore(clientComponents.Run, valueHash);
}

export const currentPlayerRun: Readable<Run | null> = derived([currentPlayer], ([player], set) => {
    (async () => {
        if (!player?.run_id) {
            set(null);
            return;
        }
        (await Run(player?.run_id as number)).subscribe(val => {
            set(val as Run);
        })
    })()
});