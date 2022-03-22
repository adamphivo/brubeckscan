import { derived, writable } from "svelte/store";

export const userData = writable(null as any);
export const userDataComputed = writable(null as any);

export const watchListSummary = derived(userDataComputed, (userDataComputed) => {

    if (!userDataComputed) return null;

    if (userDataComputed.length === 0) return null;

    let count = userDataComputed.length;
    let totalDataStaked = 0;
    let totalRewardsInData = 0;
    let totalClaimCount = 0;

    userDataComputed.forEach((node) => {
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