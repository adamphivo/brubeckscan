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
        totalRewardsInData: 0
    };
    const users = await UserDAO.getAllUsers();

    const promises = users.map(async (user) => {
        const watchList = await UserService.getWatchlist(user.nodes);
        const totals = WatchlistService.getTotals(watchList);
        await UserDAO.saveWatchListStats(user, totals);
        appStat.totalUsers += 1;
        appStat.totalNodesWatched += totals.count;
        appStat.totalDataStaked += totals.totalDataStaked;
        appStat.totalRewardsInData += totals.totalRewardsInData;
        appStat.totalClaimCount += totals.totalClaimCount;
    });

    const chunks = chunk(promises, 20);

    for (const chunk of chunks) {
        await Promise.allSettled(chunk);
    }

    const savedAppStat = await prisma.appStat.create({
        data: appStat
    });

    await StreamService.feedStream.publish("brubeckScanStat", `BRUBECKSCAN STAT | All users nodes watched : ${appStat.totalNodesWatched} 🕶`);
    await StreamService.feedStream.publish("brubeckScanStat", `BRUBECKSCAN STAT | All users data staked : ${Format.tokenValue(appStat.totalDataStaked)} DATA 💪`);
    await StreamService.feedStream.publish("brubeckScanStat", `BRUBECKSCAN STAT | All users cumulated rewards : ${Format.tokenValue(appStat.totalRewardsInData)} DATA 🥳`);

    return savedAppStat;
}