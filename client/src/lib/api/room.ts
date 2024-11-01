import { componentValueStore } from "$src/dojo/componentValueStore";
import type { Room } from "$src/dojo/models.gen";
import { getDojo } from "$src/stores/dojoStores";
import { currentPlayerRun } from "./run";
import type { Readable } from "svelte/motion";
import { derived } from "svelte/store";

export type RoomState = Room & {

};

export async function Room(roomId: number): Promise<Readable<Room | null>> {
    // We consider they are unchangeable
    const { torii, clientComponents } = await getDojo();
    
    const valueHash = torii.poseidonHash([String(roomId)]);
    // return a component value store of the object:
    return derived([componentValueStore(clientComponents.Room, valueHash)], ([val], set) => {

        // This is a bug in the current version of the SDK. We are unfortunately stuck with it for now.
        // dojo... plz fix
        val.player_ids = val.player_ids.map(e => BigInt((e as any).value))
 
        // What we need to do is for every player in the room:
        // - Get the runs, nd check if they are still in the current room (if they are not, we can consider they already finished it)
        // - Mark them as dead if they are
        // - Extract the position of the player in the run
        // - Export that in a map

        set(val);
    })
}

export const currentPlayerRoom: Readable<Room | null> = derived([currentPlayerRun], ([playerRun], set) => {
    (async () => {
        if (playerRun == null) {
            set(null);
            return;
        }

        (await Room(playerRun.room_id as number)).subscribe(val => {
            set(val as Room);
        })
    })()
});