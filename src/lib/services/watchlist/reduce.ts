export function reduce(watchlist: any) {
    let totalDataStaked = 0;
    let totalRewardsInData = 0;
    let totalClaimCount = 0;

    watchlist.forEach((node) => {
        totalDataStaked += parseInt(node.dataStaked);
        totalRewardsInData += node.rewardsInData;
        totalClaimCount += node.claimCount;
    });

    return {
        count: watchlist.length,
        totalDataStaked,
        totalRewardsInData,
        totalClaimCount
    };
}