<script lang="ts">
    import { scannedNodeData } from "$lib/stores/scannedNodeData";
    import { marketPrices } from "$lib/stores/marketPrices";
    import { userData } from "$lib/stores/userData";
    import Bookmark from "./_Bookmark.svelte";
    import Usdt from "$lib/modules/Components/Logos/_Tether.svelte";
    import Data from "$lib/modules/Components/Logos/_Data.svelte";

    $: isUserOwner = $userData?.address === $scannedNodeData?.address;
</script>

{#if $scannedNodeData}
    <div class="module {isUserOwner ? 'owner' : ''}">
        {#if $userData}
            <div class="data">
                {#if isUserOwner}
                    <div
                        title="Owner"
                        style:background={$userData.profile.gradient}
                        class="userGradient"
                    />
                {/if}
                <Bookmark />
            </div>
        {/if}
        <div />
        <div class="data">
            <div class="label">
                <p>ETH Node Public Address</p>
            </div>
            <div class="value">
                <p>{$scannedNodeData.address}</p>
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>Node Rewards in DATA</p>
            </div>
            <div class="value">
                <p>{$scannedNodeData.rewardsInData}</p>
                <p>DATA</p>
                <Data />
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>Node Rewards in USDT</p>
            </div>
            <div class="value">
                <p>
                    {$scannedNodeData.rewardsInData * $marketPrices.DATAUSDT}
                </p>
                <p>USDT</p>
                <Usdt />
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>Staked DATA</p>
            </div>
            <div class="value">
                <p>{$scannedNodeData.dataStaked}</p>
                <p>DATA</p>
                <Data />
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>Staked value in USDT</p>
            </div>
            <div class="value">
                <p>
                    {$scannedNodeData.dataStaked * $marketPrices.DATAUSDT}
                </p>
                <p>USDT</p>
                <Usdt />
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
    </div>
{/if}

<style lang="scss">
    .module {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        border: thin solid transparent;
        border-radius: 0;
    }
    .userGradient {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }

    .module.owner {
        border: thin solid rgb(67, 233, 205);
        border-radius: 0;
    }
</style>
