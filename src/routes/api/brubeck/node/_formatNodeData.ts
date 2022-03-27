type Node = {
    address: string;
    rewardsInData: number;
    claimPercentage: number;
    claimCount: number;
    claimedRewardCodes: RewardCode[],
    dataStaked: any
};

type RewardCode = {
    id: string;
    claimTime: string;
}

export function formatNodeData(data: any, address: string) {
    let node: Node = {
        address: address,
        rewardsInData: data[0].DATA || 0,
        claimCount: data[1].claimCount,
        claimPercentage: data[1].claimPercentage,
        claimedRewardCodes: data[1].claimedRewardCodes.slice(Math.max(data[1].claimedRewardCodes.length - 100, 0)).reverse(),
        dataStaked: data[2]?.data?.erc20Balances[0]?.value || 0
    };

    return node;
}