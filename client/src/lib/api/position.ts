import { componentValueStore } from "$src/dojo/componentValueStore";
import type { Player, Position as PositionTy } from "$src/dojo/models.gen";
import { getDojo, getDojoContext } from "$src/stores/dojoStores";
import { derived, readable, writable, type Readable, type Writable } from "svelte/store";
import { currentPlayerRun } from "./run";
import get from "./utils";

async function Position(runId: number): Promise<Readable<PositionTy | null>> {
    // We consider they are unchangeable
    const { torii, clientComponents } = await getDojo();
    const valueHash = torii.poseidonHash([String(runId)]);

    // return a component value store of the object:
    return componentValueStore(clientComponents.Position, valueHash);
}

export const currentPlayerPosition = derived([currentPlayerRun], ([playerRun], set) => {
    if (playerRun?.run_id == undefined) {
        return;
    }

    get(Position(playerRun?.run_id as number)).subscribe(newVal => {
        set(newVal);
    })
})