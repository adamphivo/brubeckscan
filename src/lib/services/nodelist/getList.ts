import prisma from "$lib/clients/prisma";
import { send } from "$lib/helpers/send";

export async function getList(id: number) {
    try {
        const found = await prisma.nodeList.findUnique({
            where: {
                id: id,
            },
            include: {
                nodes: true
            }
        })

        const list = await gatherListData(found);

        return list;
    } catch (e) {
        return e;
    }
}

async function gatherListData(list: any) {
    const addresses = list.nodes.map(node => node.address);

    const promises = await Promise.all(addresses.map(async (address) => {
        return send('GET', `node/${address}.json`);
    }));

    const data = await Promise.all(promises.map(res => res.json()));

    let totalRewardsInData = 0;
    let totalClaimCount = 0;

    // Aggregate two sources - DB & External APIs
    for (const listNode of list.nodes) {
        const found = data.find(node => node.address === listNode.address);
        totalRewardsInData += found.rewardsInData;
        totalClaimCount += found.claimCount;
        listNode.externalData = found;
    }

    list.totalRewardsInData = totalRewardsInData;
    list.totalClaimCount = totalClaimCount;

    return list;
};