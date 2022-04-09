import { writable, derived } from "svelte/store";

export const brubeckData = writable({
    lastRewards: [],
    apy: {},
    lastCode: ""
});
export const brubeckDataHistory = writable(null as any);

export const brubeckDataHistorySets = derived(brubeckDataHistory, (brubeckDataHistory) => {
    let labels = [];
    let apys = [];
    let totalDataStaked = [];

    for (const stat of brubeckDataHistory) {
        const date = new Date(stat.createdAt);
        labels.push(`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`);
        totalDataStaked.push(stat.dailyDataStaked);
        apys.push(stat.dailyAPY);
    }
    return {
        labels,
        apys,
        totalDataStaked
    };
});

export const brubeckDataDerived = derived(brubeckData, (brubeckData) => {
    let codes = [];
    let missedClaims = [];
    let topologySizes = [];
    let receivedClaims = [];
    let meanPropagationDelays = [];

    brubeckData.lastRewards.forEach((reward) => {
        codes.push(reward.code);
        receivedClaims.push(reward.receivedClaims);
        topologySizes.push(reward.topologySize);
        meanPropagationDelays.push(reward.meanPropagationDelay);
        missedClaims.push(reward.topologySize - reward.receivedClaims);
    });

    return {
        codes,
        missedClaims,
        topologySizes,
        receivedClaims,
        meanPropagationDelays
    };
});