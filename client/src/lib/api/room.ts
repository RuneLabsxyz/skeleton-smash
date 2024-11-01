import { componentValueStore } from "$src/dojo/componentValueStore";
import type { Room } from "$src/dojo/models.gen";
import { getDojo } from "$src/stores/dojoStores";
import { currentPlayerRun } from "./run";
import type { Readable } from "svelte/motion";
import { derived } from "svelte/store";

export async function Room(roomId: number) {
    // We consider they are unchangeable
    const { torii, clientComponents } = await getDojo();
    
    const valueHash = torii.poseidonHash([String(roomId)]);
    // return a component value store of the object:
    return derived([componentValueStore(clientComponents.Room, valueHash)], ([val], set) => {

        // This is a bug in the current version of the SDK. We are unfortunately stuck with it for now.
        // dojo... plz fix
        val.player_ids = val.player_ids.map(e => BigInt((e as any).value))

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