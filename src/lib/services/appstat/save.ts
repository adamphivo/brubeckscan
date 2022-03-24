import prisma from "$lib/clients/prisma";

export async function save(appStat: any) {
    const saved = await prisma.appStat.create({
        data: appStat
    });

    return saved;
}