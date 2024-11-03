import { componentValueStore } from "$src/dojo/componentValueStore";
import type { Position as PositionTy } from "$src/dojo/models.gen";
import { getDojo} from "$src/stores/dojoStores";
import { derived, type Readable } from "svelte/store";
import { currentPlayerRun } from "./run";
import { currentPlayerRoom } from "./room";
import get from "./utils";

export async function Position(runId: number): Promise<Readable<PositionTy | null>> {
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

export const otherPlayerPositions = derived([currentPlayerRoom], ([room], set) => {
    if (room == null) {
        set(null);
        return;
    }

    const positions: Record<number, PositionTy> = {};
    const unsubscribes: (() => void)[] = [];

    for (const run_id of room.run_ids) {
        (async () => {
            const positionStore = await Position(Number(run_id));
            const unsubscribe = positionStore.subscribe(pos => {
                if (pos !== undefined && pos !== null) {
                    positions[Number(run_id)] = pos;
                    set({ ...positions });
                }
            });
            unsubscribes.push(unsubscribe);
        })();
    }

    return () => {
        unsubscribes.forEach(unsubscribe => unsubscribe());
    };
});
