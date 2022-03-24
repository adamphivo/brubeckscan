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

export const userDataSets = derived(userData, (userData) => {
    let labels = [] as any;
    let rewardsInData = [];
    if (userData.watchlistStats) {
        for (const stat of userData.watchlistStats) {
            labels.push(stat.createdAt);
            rewardsInData.push(stat.totalRewardsInData);
        }
    }

    return {
        labels,
        rewardsInData
    };
});