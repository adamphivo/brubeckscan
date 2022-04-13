type Node = {
  address: string;
  rewardsInData: number;
  claimPercentage: number;
  claimCount: number;
  claimedRewardCodes: RewardCode[];
  dataStaked: any;
  dataSent: number;
  payouts: Payout[];
};

type RewardCode = {
  id: string;
  claimTime: string;
};

type Payout = {
  value: string;
  timestamp: string;
}

export function format(data: any, address: string): Node {
  console.log(data[2]?.data.erc20Transfers);
  const dataSent: number = data[2]?.data?.erc20Transfers.reduce(
    (previous, current) => {
      return previous + +current.value;
    },
    0
  );
  
  let node: Node = {
    address: address,
    rewardsInData: data[1].DATA || 0,
    claimCount: +data[0].claimCount,
    claimPercentage: +data[0].claimPercentage,
    claimedRewardCodes: data[0].claimedRewardCodes
      .slice(Math.max(data[0].claimedRewardCodes.length - 100, 0))
      .reverse(),
    dataStaked: +data[3]?.data?.erc20Balances[0]?.value || 0,
    dataSent: +dataSent || 0,
    payouts: data[2]?.data?.erc20Transfers
  };

  return node;
}
