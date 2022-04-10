import { writable } from "svelte/store";

export const selectedCurrency = writable("data");
export const selectedOverviewCurrency = writable("data");
export const selectedScanCurrency = writable("data");