import { writable } from "svelte/store";

export const hasEthereum = writable(false as any);
export const userData = writable(null as any);
export const anonymousUserUid = writable("");