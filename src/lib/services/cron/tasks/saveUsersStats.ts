import UserService from "$lib/services/user";
import UserDAO from "$lib/dao/user";
import WatchlistService from "$lib/services/watchlist";
import prisma from "$lib/clients/prisma";
import StreamService from "$lib/services/stream";
import Format from "$lib/helpers/format";
import { chunk } from "$lib/helpers/chunk";

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
            totalDataStaked: Math.round(computed.totalDataStaked),
            totalRewardsInData: Math.round(computed.totalRewardsInData),
            totalClaimCount: Math.round(computed.totalClaimCount)
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

    const chunks = chunk(promises, 20);

    for (const chunk of chunks) {
        await Promise.all(chunk);
    }

    const savedAppStat = await prisma.appStat.create({
        data: appStat
    });

    await StreamService.feedStream.publish("brubeckScanStat", `BRUBECKSCAN STAT | All users nodes watched : ${appStat.totalNodesWatched} 🕶`);
    await StreamService.feedStream.publish("brubeckScanStat", `BRUBECKSCAN STAT | All users data staked : ${Format.tokenValue(appStat.totalDataStaked)} DATA 💪`);
    await StreamService.feedStream.publish("brubeckScanStat", `BRUBECKSCAN STAT | All users cumulated rewards : ${Format.tokenValue(appStat.totalRewardsInData)} DATA 🥳`);

    return savedAppStat;
}