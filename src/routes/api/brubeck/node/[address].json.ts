type Node = {
    address: string;
    rewardsInData: number;
    claimCount: number;
    claimedRewardCodes: RewardCode[]
};

type RewardCode = {
    id: string;
    claimTime: string;
}

export async function get({ params }) {
    if (params.address) {
        const urls = [
            "https://brubeck1.streamr.network:3013/datarewards/",
            "https://brubeck1.streamr.network:3013/stats/",
        ];

        const requests = urls.map(async (url) => {
            return await fetch(`${url}${params.address}`);
        });

        const responses = await Promise.all(requests);

        const data = await Promise.all(
            responses.map((response) => response.json())
        );

        const node = formatNodeData(data, params.address);

        return {
            status: 200,
            body: node
        }
    }
}

const formatNodeData = (data: any, address: string) => {
    let node: Node = {
        address: address,
        rewardsInData: data[0].DATA || 0,
        claimCount: data[1].claimCount,
        claimedRewardCodes: data[1].claimedRewardCodes
    };

    return node;
}