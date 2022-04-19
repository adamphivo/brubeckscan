import { writable, type Writable } from "svelte/store";

export const selectedNodesCurrency: Writable<string> = writable("data");
export const selectedOverviewCurrency: Writable<string> = writable("data");
export const selectedScanCurrency: Writable<string> = writable("data");