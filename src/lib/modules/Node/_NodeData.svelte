<script lang="ts">
    import { session } from "$app/stores";
    import { scannedNodeData } from "$lib/stores/scannedNodeData";
</script>

{#if $scannedNodeData}
    <div class="module">
        <div class="data">
            <div class="label">
                <p>ETH Public Address</p>
            </div>
            <div class="value">
                <p>{$scannedNodeData.address}</p>
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>Rewards in Data</p>
            </div>
            <div class="value">
                <p>{$scannedNodeData.rewardsInData}</p>
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>Rewards in USDT</p>
            </div>
            <div class="value">
                <p>
                    {$scannedNodeData.rewardsInData * $session.prices.DATAUSDT}
                </p>
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>Claim Count</p>
            </div>
            <div class="value">
                <p>{$scannedNodeData.claimCount}</p>
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>Data Staked</p>
            </div>
            <div class="data">
                <p>{$scannedNodeData.dataStaked}</p>
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>Data Staked in USDT</p>
            </div>
            <div class="value">
                <p>
                    {$scannedNodeData.dataStaked * $session.prices.DATAUSDT}
                </p>
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
    .module {
        width: 100%;
        border: none;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .data {
        display: flex;
        justify-content: space-between;
    }
</style>
