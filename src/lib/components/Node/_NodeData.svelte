<script lang="ts">
    import Format from "$lib/helpers/format";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { scannedNodeData } from "$lib/stores/scannedNodeData";
    import { marketPrices } from "$lib/stores/marketPrices";
    import { userData } from "$lib/stores/userData";
    import Bookmark from "./_Bookmark.svelte";
    import { send } from "$lib/helpers/send";
    import { validate } from "$lib/helpers/validate";

    $: isUserOwner = $userData?.address === $scannedNodeData?.address;

    let copyText = "Copy";

    function copyAddressToClipboard() {
        navigator.clipboard.writeText($scannedNodeData.address);
        copyText = "Copied";
        setTimeout(() => (copyText = "Copy"), 2000);
    }

    onMount(async () => {
        const address = $page.url.searchParams.get('address');
        if (address) {
            if (validate.ethAddress(address)) {
                const response = await send(
                    "GET",
                    `brubeck/node/${address.toLowerCase()}.json`
                );
                const node = await response.json();

                if (node) {
                    $scannedNodeData = node;
                }
            } else {
                throw new Error();
            }
        } else {
            return {};
        }
    })
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
                <p>
                    {Format.shortenNodeAddress($scannedNodeData.address)}
                </p>
                <button on:click={copyAddressToClipboard}>{copyText}</button>
            </div>
        </div>
        <div class="separator"></div>
        <div class="data">
            <div class="label">
                <p>Node Rewards in DATA</p>
            </div>
            <div class="value">
                <p>{Format.tokenValue($scannedNodeData.rewardsInData)}</p>
                <p>DATA</p>
            </div>
        </div>
        <div class="separator"></div>
        <div class="data">
            <div class="label">
                <p>Node Rewards in USDT</p>
            </div>
            <div class="value">
                <p>
                    {Format.tokenValue(
                        $scannedNodeData.rewardsInData * $marketPrices.DATAUSDT
                    )}
                </p>
                <p>USDT</p>
            </div>
        </div>
        <div class="separator"></div>
        <div class="data">
            <div class="label">
                <p>Received DATA</p>
            </div>
            <div class="value">
                <p>{Format.tokenValue($scannedNodeData.dataSent)}</p>
                <p>DATA</p>
            </div>
        </div>
        <div class="separator"></div>
        <div class="data">
            <div class="label">
                <p>DATA to be received</p>
            </div>
            <div class="value">
                <p>{Format.tokenValue($scannedNodeData.rewardsInData - $scannedNodeData.dataSent)}</p>
                <p>DATA</p>
            </div>
        </div>
        <div class="separator"></div>
        <div class="data">
            <div class="label">
                <p>Staked DATA</p>
            </div>
            <div class="value">
                <p>{Format.tokenValue($scannedNodeData.dataStaked)}</p>
                <p>DATA</p>
            </div>
        </div>
        <div class="separator"></div>
        <div class="data">
            <div class="label">
                <p>Staked value in USDT</p>
            </div>
            <div class="value">
                <p>
                    {Format.tokenValue(
                        $scannedNodeData.dataStaked * $marketPrices.DATAUSDT
                    )}
                </p>
                <p>USDT</p>
            </div>
        </div>
        <div class="separator"></div>
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
