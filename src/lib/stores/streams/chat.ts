import { writable } from "svelte/store";

interface ChatStreamMessage {
    userAddress: string;
    userGradient: string;
    message: string;
    metadata: object;
}

export const chatMessages = writable([] as ChatStreamMessage[]);