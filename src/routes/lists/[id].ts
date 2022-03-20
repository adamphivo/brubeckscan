import prisma from "$lib/clients/prisma";

async function gatherListData(list: any) {
    const addresses = list.nodes.map(node => node.address);


    const promises = await Promise.all(addresses.map(async (address) => {
        const url = `http://localhost:3000/api/node/${address}.json`
        return await fetch(url, {
            method: "GET",
            headers: {
                internal_token: `${import.meta.env.VITE_AUTH_TOKEN}`,
            },
        });
    }));

    const data = await Promise.all(promises.map(res => res.json()));

    let totalRewardsInData = 0;
    let totalClaimCount = 0;

    for (const node of data) {
        totalClaimCount += node.claimCount;
        totalRewardsInData += node.rewardsInData;
    }
};

export async function get({ request, params }) {
    const list = await prisma.nodeList.findUnique({
        where: {
            id: parseInt(params.id),
        },
        include: {
            nodes: true
        }
    })

    if (list) {
        const data = await gatherListData(list);
        return {
            body: {
                list: list
            }
        };
    } else {
        return {};
    }
}