import { derived, writable } from "svelte/store";
import { computeWatchList } from "$lib/helpers/computeWatchlist";

export const userData = writable(null as any);

export const watchListData = writable(null as any);

export const watchListSummary = derived(watchListData, (watchListData) => {

    if (!watchListData) return null;

    if (watchListData.length === 0) return null;

    const computed = computeWatchList(watchListData);

    return computed;
});