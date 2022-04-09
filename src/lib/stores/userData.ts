import { derived, writable } from "svelte/store";
import { reduce } from "$lib/services/watchlist/reduce";

export const hasEthereum = writable(false as any);

export const userData = writable(null as any);

export const watchListData = writable(null as any);

export const watchListSummary = derived(watchListData, (watchListData) => {

    if (!watchListData) return null;

    if (watchListData.length === 0) return null;

    const computed = reduce(watchListData);

    return computed;
});

export const userDataSets = derived(userData, (userData) => {
    if (!userData) return {
        labels: [],
        rewardsInData: []
    };
    
    let labels = [] as any;
    let rewardsInData = [];

    if (userData.watchlistStats) {
        for (const stat of userData.watchlistStats) {
            const date = new Date(stat.createdAt);
            labels.push(`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`);
            rewardsInData.push(stat.totalRewardsInData);
        }
    }

    return {
        labels,
        rewardsInData
    };
});