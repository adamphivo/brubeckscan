export function getTotals(watchlist: any) {
  let totalDataStaked = 0;
  let totalRewardsInData = 0;
  let totalClaimCount = 0;
  let totalDataSent = 0;

  if (!watchlist || !Array.isArray(watchlist)) {
    return {
      count: 0,
      totalDataStaked: 0,
      totalRewardsInData: 0,
      totalClaimCount: 0,
      totalDataSent: 0,
    };
  }

  watchlist.forEach((node) => {
    totalDataStaked += parseInt(node?.dataStaked);
    totalRewardsInData += +node?.rewardsInData || 0;
    totalClaimCount += +node?.claimCount || 0;
    totalDataSent += +node?.dataSent || 0;
  });

  return {
    count: watchlist.length,
    totalDataStaked,
    totalRewardsInData,
    totalClaimCount,
    totalDataSent,
  };
}
