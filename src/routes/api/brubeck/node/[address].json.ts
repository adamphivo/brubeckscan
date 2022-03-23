import { appCache } from "$lib/helpers/cache";
import Consts from "$lib/consts";

type Node = {
    address: string;
    rewardsInData: number;
    claimCount: number;
    claimedRewardCodes: RewardCode[],
    dataStaked: any
};

type RewardCode = {
    id: string;
    claimTime: string;
}

export async function get({ params }) {
    if (params.address) {
        const cached = appCache.get(`${Consts.cache.NODE_AGGREGATED_DATA_BASE}${params.address}`);

        if (cached) {
            return {
                body: cached
            }
        } else {
            const urls = [
                Consts.urls.BRUBECK_NODE_REWARDS_BASE,
                Consts.urls.BRUBECK_NODE_STATS_BASE,
            ];

            const requests = urls.map(async (url) => {
                return await fetch(`${url}${params.address}`);
            });

            requests.push(getDataStaked(params.address));

            const responses = await Promise.all(requests);

            const data = await Promise.all(
                responses.map((response) => response.json())
            );

            const node = formatNodeData(data, params.address);

            const save = appCache.set(`${Consts.cache.NODE_AGGREGATED_DATA_BASE}${params.address}`, node, Consts.cache.TTL);

            return {
                status: 200,
                body: node
            }
        }
    }
}

const formatNodeData = (data: any, address: string) => {
    let node: Node = {
        address: address,
        rewardsInData: data[0].DATA || 0,
        claimCount: data[1].claimCount,
        claimedRewardCodes: data[1].claimedRewardCodes.slice(Math.max(data[1].claimedRewardCodes.length - 100, 0)).reverse(),
        dataStaked: data[2]?.data?.erc20Balances[0]?.value || 0
    };

    return node;
}

async function getDataStaked(address: string) {
    return await fetch("https://api.thegraph.com/subgraphs/name/streamr-dev/data-on-polygon", {
        "method": "POST",
        "headers": {
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Connection": "keep-alive",
            "DNT": "1",
            "Origin": "file://"
        },
        "body": `{\"query\":\"{\\n  erc20Balances(where: {account: \\\"${address}\\\", contract:\\\"0x3a9a81d576d83ff21f26f325066054540720fc34\\\"}) {\\n    value \\n  }\\n}\"}`
    })
}