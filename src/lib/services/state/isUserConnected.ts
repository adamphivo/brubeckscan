import { get } from "svelte/store";
import { userData } from "$lib/stores/user";

export function isUserConnected(): boolean {
    const value = get(userData);
    if (value) return true;
    return false;
}