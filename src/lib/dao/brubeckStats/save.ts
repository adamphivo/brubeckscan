import prisma from "$lib/clients/prisma";

export async function save(brubeckStats: any) {
    const brubeckStat = await prisma.brubeckStats.create({
        data: {
            dailyAPR: brubeckStats.apy['24h-APR'],
            dailyAPY: brubeckStats.apy['24h-APY'],
            spotAPR: brubeckStats.apy['spot-APR'],
            spotAPY: brubeckStats.apy['spot-APY'],
            dailyDataStaked: brubeckStats.apy['24h-data-staked'],
            spotDataStaked: brubeckStats.apy['spot-data-staked']
        }
    })

    return brubeckStat;
}