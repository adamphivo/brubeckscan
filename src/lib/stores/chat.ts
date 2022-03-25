import { writable } from "svelte/store";

export const chat = writable({ messages: [] } as any);