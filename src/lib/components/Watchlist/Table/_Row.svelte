<script lang="ts">
    import Format from "$lib/helpers/format";
    import { userData, watchListData } from "$lib/stores/userData";
    import { marketPrices } from "$lib/stores/marketPrices";
    import { brubeckData } from "$lib/stores/brubeckData";
    import { send } from "$lib/helpers/send";
    import FeedService from "$lib/services/feeds";
    import Button from "$lib/components/HTMLElements/Button.svelte";

    export let node;

    let isEditing = false;

    let nodeName = node.dataDB.name;
    let copyText = "Copy";

    function copyAddressToClipboard() {
        navigator.clipboard.writeText(node.address);
        copyText = "Copied";
        setTimeout(() => (copyText = "Copy"), 2000);
    }

    async function updateNodeName() {
        const response = await send("PATCH", "users/nodes.json", {
            nodeId: node.dataDB.id,
            newName: nodeName.trim(),
        });
        if (response.ok) {
            const data = await response.json();
            isEditing = false;
            node.dataDB.name = data.name;
        }
    }

    async function sendFund() {
        try {
            await (window as any).ethereum.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from: $userData.address,
                        to: node.address,
                    },
                ],
            });

            FeedService.publish(
                "transaction",
                `Transaction | From ${Format.shortenNodeAddress(
                    $userData.address
                )} to ${Format.shortenNodeAddress(node.address)} ⚡`
            );
        } catch (e) {
            throw e;
        }
    }

    async function unwatch() {
        const response = await send("PATCH", "watchlist.json", {
            userAddress: $userData.address,
            nodeAddress: node.address,
            action: "unwatch",
        });

        const user = await response.json();

        if (user) {
            $watchListData = $watchListData.filter((element) => {
                return element.address !== node.address;
            });
        }

        $userData = user;
    }
</script>

<tr>
    <td
        style:background={node.address === $userData.address
            ? $userData.profile.gradient
            : ""}
        id={node.address}
        class="address"
        title="Copy address to clipboard"
    >
        <p class="address">
            {Format.shortenNodeAddress(node.address)}
            <button on:click={copyAddressToClipboard}>{copyText}</button>
        </p>
    </td>

    <!-- Name quick edit -->
    {#if node.dataDB}
        <td>
            <div class="nameEditorContainer">
                {#if !isEditing}
                    <div class="valueContainer">
                        <p>{node.dataDB.name}</p>
                        <button on:click={() => (isEditing = true)}>
                            Edit
                        </button>
                    </div>
                {:else}
                    <div class="valueContainer">
                        <input bind:value={nodeName} maxlength="20" />
                        <div>
                            <button on:click={updateNodeName}> Save </button>
                            <button
                                on:click={() => {
                                    isEditing = false;
                                    nodeName = node.dataDB.name;
                                }}
                            >
                                Quit
                            </button>
                        </div>
                    </div>
                {/if}
            </div>
        </td>
    {/if}
    <td>
        <p>{node.rewardsInData}</p>
    </td>
    <td>
        <p>
            {Format.twoDecimals(node.rewardsInData * $marketPrices.DATAUSDT)}
        </p>
    </td>
    <td>
        <p
            class={node.dataStaked === 0 || node.dataStaked > 10000
                ? "warning"
                : ""}
        >
            {Format.tokenValue(node.dataStaked)}
        </p>
    </td>
    <td>
        <p>
            {Format.twoDecimals(node.dataStaked * $marketPrices.DATAUSDT)}
        </p>
    </td>
    <td><p>{node.claimCount}</p></td>

    <!-- Status -->
    <td>
        {#if node?.claimedRewardCodes[0]?.id === $brubeckData?.lastCode}
            <p class="ok" title="Claimed the latest reward code">OK</p>
        {:else}
            <p class="ko" title="Did not claim the latest reward code">KO</p>
        {/if}
    </td>

    <!-- Actions -->
    <td>
        <div class="buttonContainer">
            {#if node.address != $userData.address}
                <div title="Send funds to this address">
                    <Button text="Send" action={sendFund} />
                </div>
                <button
                    on:click={unwatch}
                    title="Remove this node from your watchlist">Remove</button
                >
            {:else}
                <div class="owner">Owner</div>
            {/if}
        </div>
    </td>
</tr>

<style lang="scss">
    .address {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    .nameEditorContainer {
        .valueContainer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            font-size: 16px;
            padding: 0 10px;
            input {
                padding: 5px 10px;
                font-size: 16px;
                border-left: 0;
                border-top: 0;
                border-right: 0;
                border-radius: 0;
            }
        }
    }
    .buttonContainer {
        display: flex;
        justify-content: center;
        gap: 10px;
        padding: 20px;
    }

    .address {
        font-size: 14px;
        line-height: 20px;
        font-weight: bold;
        color: whitesmoke;
    }

    .owner {
        color: rgb(67, 233, 205);
        font-weight: bold;
        font-size: 18px;
    }

    .ko {
        color: rgb(226, 88, 88);
    }

    .ok {
        color: lightgreen;
    }

    p.warning {
        color: rgb(226, 162, 88);
    }
</style>
