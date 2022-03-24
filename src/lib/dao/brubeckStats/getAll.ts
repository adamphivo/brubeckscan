import prisma from "$lib/clients/prisma";

export async function getAll() {
    const brubeckStats = await prisma.brubeckStats.findMany({
        orderBy: {
            createdAt: 'asc'
        }
    });

    return brubeckStats;
}