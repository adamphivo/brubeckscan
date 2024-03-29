// staked, toBeReceived, sent & rewards are in DATA Token
export interface BrubeckNodeStats {
    address: string;
    status: boolean;
    staked: number;
    toBeReceived: number;
    sent: number;
    rewards: number;
    firstClaim: RewardCode | null;
    lastClaim: RewardCode | null;
    claimCount: number;
    claimPercentage: number;
    claimedRewardCodes: RewardCode[];
    payouts: Payout[];
    polygonScanURL: string;
    identiconURL: string;
}

interface Payout {
    value: string;
    timestamp: string;
}

interface RewardCode {
    id: string;
    claimTime: string;
}
