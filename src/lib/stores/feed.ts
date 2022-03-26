import { writable } from "svelte/store";

export const feed = writable({ messages: [
    {
        content: "Welcome to the BrubeckScan live feed 👋",
        metadata: {
            messageId: {
                timestamp: Date.now()
            }
        }
    }
] } as any);