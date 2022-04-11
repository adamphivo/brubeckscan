import UserService from "$lib/services/user";
import WatchlistService from "$lib/services/watchlist";
import UserDAO from "$lib/dao/user";
import prisma from "$lib/clients/prisma";
import StreamService from "$lib/services/stream";
import Format from "$lib/helpers/format";
import { chunk } from "$lib/helpers/chunk";

export async function saveUsersStats() {
  const appStat = {
    totalUsers: 0,
    totalClaimCount: 0,
    totalDataStaked: 0,
    totalNodesWatched: 0,
    totalRewardsInData: 0,
  };

  const users = await UserDAO.getAllUsers();

  const promises = users.map(async (user) => {
    if (!user.nodes || !user.nodes.length) {
      console.log(user);
      return;
    }
    const watchList = await UserService.getWatchlist(user.nodes);
    if (!watchList) return;
    const totals = WatchlistService.getTotals(watchList);
    const updatedUser = await UserDAO.saveWatchListStats(user, totals);
    appStat.totalUsers += 1;
    appStat.totalNodesWatched += +totals.count;
    appStat.totalDataStaked += +totals.totalDataStaked;
    appStat.totalRewardsInData += +totals.totalRewardsInData;
    appStat.totalClaimCount += +totals.totalClaimCount;
    return updatedUser;
  });

  const chunks = chunk(promises, 20);

  for (const chunk of chunks) {
    const results = await Promise.allSettled(chunk);
    results.forEach((element) => {
      if (element.status === "rejected") {
        console.log(element.reason);
      }
    });
  }

  const savedAppStat = await prisma.appStat.create({
    data: appStat,
  });

  await StreamService.feedStream.publish(
    "brubeckScanStat",
    `BRUBECKSCAN STAT | All users nodes watched : ${appStat.totalNodesWatched} 🕶`
  );

  await StreamService.feedStream.publish(
    "brubeckScanStat",
    `BRUBECKSCAN STAT | All users data staked : ${Format.tokenValue(
      appStat.totalDataStaked
    )} DATA 💪`
  );

  await StreamService.feedStream.publish(
    "brubeckScanStat",
    `BRUBECKSCAN STAT | All users cumulated rewards : ${Format.tokenValue(
      appStat.totalRewardsInData
    )} DATA 🥳`
  );

  return savedAppStat;
}
