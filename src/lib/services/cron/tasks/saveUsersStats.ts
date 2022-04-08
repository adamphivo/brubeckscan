import UserService from "$lib/services/user";
import UserDAO from "$lib/dao/user";
import WatchlistService from "$lib/services/watchlist";
import prisma from "$lib/clients/prisma";
import StreamService from "$lib/services/stream";
import Format from "$lib/helpers/format";

export async function saveUsersStats() {
    const users = await UserDAO.getAllUsers();

    const appStat = {
        totalUsers: 0,
        totalNodesWatched: 0,
        totalDataStaked: 0,
        totalRewardsInData: 0,
        totalClaimCount: 0,
    };

    const promises = users.map(async (user) => {
        const watchList = await UserService.getWatchlist(user.nodes);
        const computed = WatchlistService.reduce(watchList);
        const formated = {
            totalNodes: computed.count,
            totalDataStaked: computed.totalDataStaked,
            totalRewardsInData: computed.totalRewardsInData,
            totalClaimCount: computed.totalClaimCount
        };

        await prisma.user.update({
            where: {
                address: user.address
            },
            data: {
                watchlistStats: {
                    create: formated
                }
            },
        });

        appStat.totalUsers += 1;
        appStat.totalNodesWatched += computed.count;
        appStat.totalDataStaked += computed.totalDataStaked;
        appStat.totalRewardsInData += computed.totalRewardsInData;
        appStat.totalClaimCount += computed.totalClaimCount;
    })

    await Promise.all(promises);

    const savedAppStat = await prisma.appStat.create({
        data: appStat
    });

    await StreamService.feedStream.publish("brubeckScanStat", `BRUBECKSCAN STAT | All users nodes watched : ${appStat.totalNodesWatched} 🕶`);
    await StreamService.feedStream.publish("brubeckScanStat", `BRUBECKSCAN STAT | All users data staked : ${Format.tokenValue(appStat.totalDataStaked)} DATA 💪`);
    await StreamService.feedStream.publish("brubeckScanStat", `BRUBECKSCAN STAT | All users cumulated rewards : ${Format.tokenValue(appStat.totalRewardsInData)} DATA 🥳`);

    return savedAppStat;
}