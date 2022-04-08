import StreamService from "$lib/services/stream";
import prisma from "$lib/clients/prisma";

export async function cleanup() {
    const start = Date.now();
    await StreamService.feedStream.publish("cronRun", "Cleaning started ♻️");

    // Cleanup orphaned watchlist
    await prisma.watchlistStat.deleteMany({
        where: {
            userAddress: null
        }
    });

    // Cleanup weird nodes
    const nodes = await prisma.node.findMany({});

    nodes.forEach(async (node) => {
        if (node.address.length !== 42) {
            await prisma.node.delete({
                where: {
                    id: node.id
                }
            })
        }
    });

    const stop = Date.now();
    
    const runTimeInSeconds = (stop - start) / 1000;

    await StreamService.feedStream.publish("cronRun", `Cleaning done in ${runTimeInSeconds} seconds 🌴`);
};