import prisma from "$lib/clients/prisma";

export async function saveWatchListStats(user: any, watchlist: any) {
  try {
    const formated = {
      totalNodes: watchlist.count || 0,
      totalDataStaked: Math.round(watchlist.totalDataStaked) || 0,
      totalRewardsInData: Math.round(watchlist.totalRewardsInData) || 0,
      totalClaimCount: Math.round(watchlist.totalClaimCount) || 0,
    };

    const stats = await prisma.user.update({
      where: {
        address: user.address,
      },
      data: {
        watchlistStats: {
          create: formated,
        },
      },
    });

    return stats;
  } catch (e) {
    console.log(e);
  }
}
