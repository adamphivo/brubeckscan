export function getTotals(watchlist: any) {
    let totalDataStaked = 0;
    let totalRewardsInData = 0;
    let totalClaimCount = 0;
    let totalDataSent = 0;

    watchlist.forEach((node) => {
        totalDataStaked += parseInt(node.dataStaked);
        totalRewardsInData += +node.rewardsInData || 0;
        totalClaimCount += +node.claimCount || 0;
        totalDataSent += +node.dataSent || 0;
    });

    return {
        count: watchlist.length,
        totalDataStaked,
        totalRewardsInData,
        totalClaimCount,
        totalDataSent
    };
}