import { writable, derived } from "svelte/store";

export const brubeckData = writable({
    lastRewards: [],
    apy: {},
    lastCode: ''
});

export const brubeckDataDerived = derived(brubeckData, (brubeckData) => {
    let codes = [];
    let missedClaims = [];
    let topologySizes = [];
    let receivedClaims = [];
    let meanPropagationDelays = []

    brubeckData.lastRewards.forEach((reward) => {
        codes.push(reward.code);
        receivedClaims.push(reward.receivedClaims);
        topologySizes.push(reward.topologySize);
        meanPropagationDelays.push(reward.meanPropagationDelay);
        missedClaims.push(reward.topologySize - reward.meanPropagationDelay)
    })

    return {
        codes,
        missedClaims,
        topologySizes,
        receivedClaims,
        meanPropagationDelays
    }
})