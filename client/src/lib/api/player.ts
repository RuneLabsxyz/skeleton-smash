import { componentValueStore } from "$src/dojo/componentValueStore";
import type { Player } from "$src/dojo/models.gen";
import { getDojo, getDojoContext } from "$src/stores/dojoStores";
import { derived, writable, type Writable } from "svelte/store";

async function Player(address: string) {
    // We consider they are unchangeable
    const { torii, clientComponents } = await getDojo();
    const valueHash = torii.poseidonHash([address]);

    // return a component value store of the object:
    return componentValueStore(clientComponents.Player, valueHash);
}

export const currentPlayer = writable<Player | null>(null, (set) => {
    // Compute the poseidon hash
    (async () => {
        const [account, { }] = await getDojoContext();
        (await Player(account.address)).subscribe(val => {
            set(val);
        })
    })()
})