<script lang="ts">
    import { session } from "$app/stores";
    import { scannedNodeData } from "$lib/stores/scannedNodeData";
</script>

{#if $scannedNodeData}
    <div class="module">
        <div>
            <div>
                <p>ETH Public Address</p>
            </div>
            <div>
                <p>{$scannedNodeData.address}</p>
            </div>
        </div>
        <div>
            <div>
                <p>Rewards in Data</p>
            </div>
            <div>
                <p>{$scannedNodeData.rewardsInData}</p>
            </div>
        </div>
        <div>
            <div>
                <p>Rewards in USDT</p>
            </div>
            <div>
                <p>
                    {$scannedNodeData.rewardsInData * $session.prices.DATAUSDT}
                </p>
            </div>
        </div>
        <div>
            <div>
                <p>Claim Count</p>
            </div>
            <div>
                <p>{$scannedNodeData.claimCount}</p>
            </div>
        </div>
        <div>
            <div>
                <p>Data Staked</p>
            </div>
            <div>
                <div>
                    <p>{$scannedNodeData.dataStaked}</p>
                </div>
            </div>
        </div>
        <div>
            <div>
                <p>Data Staked in USDT</p>
            </div>
            <div>
                <div>
                    <p>
                        {$scannedNodeData.dataStaked * $session.prices.DATAUSDT}
                    </p>
                </div>
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
</style>
