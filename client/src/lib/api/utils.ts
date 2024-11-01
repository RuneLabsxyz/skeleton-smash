import { readable, type Readable } from "svelte/store";

export default function get<T>(asyncedStore: Promise<Readable<T | null>>): Readable<T | null> {
    return readable<T | null>(null, (set) => {
        asyncedStore.then(store => {
            store.subscribe(value => set(value))
        })
    })
}