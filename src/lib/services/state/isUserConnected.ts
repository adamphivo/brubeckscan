import { get } from "svelte/store";
import { userData } from "$lib/stores/userData";

export function isUserConnected(): boolean {
    const value = get(userData);
    if (value) return true;
    return false;
}