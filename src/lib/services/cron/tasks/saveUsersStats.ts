import UserService from "$lib/services/user";
import UserDAO from "$lib/dao/user";
import { computeWatchList } from "$lib/helpers/computeWatchlist";
import prisma from "$lib/clients/prisma";

export async function saveUsersStats() {
    const users = await UserDAO.getAllUsers();

    const appStat = {
        totalUsers: 0,
        totalNodesWatched: 0,
        totalDataStaked: 0,
        totalRewardsInData: 0,
        totalClaimCount: 0,
    };

    for (const user of users) {
        const watchList = await UserService.getWatchlist(user.nodes);
        const computed = computeWatchList(watchList);
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
    }

    const savedAppStat = await prisma.appStat.create({
        data: appStat
    });

    return savedAppStat;
}