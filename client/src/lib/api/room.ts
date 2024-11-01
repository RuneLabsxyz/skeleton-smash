import { playerPosition } from "$lib/components/players";
import { componentValueStore } from "$src/dojo/componentValueStore";
import type { Position, Room } from "$src/dojo/models.gen";
import { getDojo } from "$src/stores/dojoStores";
import { currentPlayerRun, Run } from "./run";
import type { Readable } from "svelte/motion";
import { derived } from "svelte/store";
import get from "./utils";

export type RoomState = Room & {
    playerPositions: Position[]
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
            playerPositions: [],
            ...val
        }
        result.run_ids = result.run_ids.map(e => (e as any).value)
 
        // What we need to do is for every player in the room:
        // - Mark them as dead if they are
        // - Extract the position of the player in the run
        // - Export that in a map

        val.run_ids.forEach(async (runId, idx) => {
            // Subscribe to the store, and update the current value whenever we get it:
            (await Run(runId)).subscribe(run => {
                if (run.room_id != roomId) {
                    // We ignore the run if they are not currently in this room
                    return;
                }

            })
        })

        set(result);
    })
}

export const currentPlayerRoom: Readable<Room | null> = derived([currentPlayerRun], ([playerRun], set) => {
    if (playerRun == null) {
        set(null);
        return;
    }

    get(Room(playerRun.room_id as number)).subscribe(val => {
        set(val as Room);
    })
});