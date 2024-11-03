import { componentValueStore } from "$src/dojo/componentValueStore";
import type { Position, Room } from "$src/dojo/models.gen";
import { getDojo } from "$src/stores/dojoStores";
import { currentPlayerRun, Run } from "./run";
import type { Readable } from "svelte/motion";
import { derived } from "svelte/store";
import get from "./utils";

export type RoomState = Room & {
};

export async function Room(roomId: number): Promise<Readable<RoomState | null>> {
    // We consider they are unchangeable
    const { torii, clientComponents } = await getDojo();

    const valueHash = torii.poseidonHash([String(roomId)]);
    // return a component value store of the object:
    return derived([componentValueStore(clientComponents.Room, valueHash)], ([val], set) => {

        // This is a bug in the current version of the SDK. We are unfortunately stuck with it for now.
        // dojo... plz fix
        let result: RoomState = {
            ...val
        }
        result.run_ids = result.run_ids.map(e => (e as any).value)

        set(result);
    })
}

export const currentPlayerRoom: Readable<RoomState | null> = derived([currentPlayerRun], ([playerRun], set) => {
    if (playerRun == null) {
        set(null);
        return;
    }

    get(Room(playerRun.room_id as number)).subscribe(val => {
        set(val);
    })
});