import { derived, writable } from "svelte/store";

export const userData = writable(null as any);

export const watchListData = writable(null as any);

export const watchListSummary = derived(watchListData, (watchListData) => {

    if (!watchListData) return null;

    if (watchListData.length === 0) return null;

    let count = watchListData.length;
    let totalDataStaked = 0;
    let totalRewardsInData = 0;
    let totalClaimCount = 0;

    watchListData.forEach((node) => {
        totalDataStaked += parseInt(node.dataStaked);
        totalRewardsInData += node.rewardsInData;
        totalClaimCount += node.claimCount;
    })

    return {
        count,
        totalDataStaked,
        totalRewardsInData,
        totalClaimCount
    }
});