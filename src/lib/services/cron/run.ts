import prisma from "$lib/clients/prisma";
import { send } from "$lib/helpers/send";
import UserService from "$lib/services/user";
import BrubeckStatsDAO from "$lib/dao/brubeckStats";
import UserDAO from "$lib/dao/user";
import { computeWatchList } from "$lib/helpers/computeWatchlist";

export async function run() {
    const start = Date.now();
    console.log("CRON Run Start", start);
    try {

        // BRUBECK NETWORK
        const getBrubeckData = await send("GET", "brubeck/stats.json");
        const brubeckStats = await getBrubeckData.json();
        const savedBrubeckStats = await BrubeckStatsDAO.save(brubeckStats);

        // USERS WATCHLISTS
        const users = await UserDAO.getAllUsers();

        const appStat = {
            totalUsers: 0,
            totalNodesWatched: 0,
            totalDataStaked: 0,
            totalRewardsInData: 0,
            totalClaimCount: 0,
        };

        for (const user of users) {
            const watchList = await UserService.getNodesData(user.nodes);
            const computed = computeWatchList(watchList);
            const formated = {
                totalNodes: computed.count,
                totalDataStaked: computed.totalDataStaked,
                totalRewardsInData: computed.totalRewardsInData,
                totalClaimCount: computed.totalClaimCount
            };

            const updatedUser = await prisma.user.update({
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

        const stop = Date.now()
        console.log("CRON Run Stop", stop);

        const runTimeInSeconds = (stop - start) / 1000;

        const cronRun = await prisma.cronRun.create({
            data: {
                finalStatus: 1,
                runTimeInSeconds: runTimeInSeconds
            }
        });

        // RETURN
        return {
            finalStatus: "OK",
            cronRunTimeInSeconds: runTimeInSeconds,
            savedBrubeckStats: savedBrubeckStats,
            appStat: savedAppStat
        };
    } catch (e) {
        const stop = Date.now()
        console.log("CRON Run Stop", stop);
        const runTimeInSeconds = (stop - start) / 1000;
        const cronRun = await prisma.cronRun.create({
            data: {
                finalStatus: 0,
                runTimeInSeconds: runTimeInSeconds
            }
        });
        throw e;
    }
}