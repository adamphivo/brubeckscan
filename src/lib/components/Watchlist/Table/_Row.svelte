<script lang="ts">
    import Format from "$lib/helpers/format";
    import { userData, watchListData } from "$lib/stores/userData";
    import { marketPrices } from "$lib/stores/marketPrices";
    import { brubeckData } from "$lib/stores/brubeckData";
    import { send } from "$lib/helpers/send";

    export let node;

    let isEditing = false;

    let nodeName = node.dataDB.name;

    async function updateNodeName() {
        const response = await send("PATCH", "users/nodes.json", {
            nodeId: node.dataDB.id,
            newName: nodeName,
        });
        if (response.ok) {
            const data = await response.json();
            isEditing = false;
            node.dataDB.name = data.name;
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
    >
        <p>
            {Format.shortenNodeAddress(node.address)}
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
                        <input bind:value={nodeName} />
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
                <button on:click={unwatch}>Remove</button>
            {:else}
                <div class="owner">Owner</div>
            {/if}
        </div>
    </td>
</tr>

<style lang="scss">
    .nameEditorContainer {
        .valueContainer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            font-size: 16px;
            padding: 0 10px;
            input {
                margin-left: 20px;
                padding: 5px 20px;
            }
        }
    }
    .buttonContainer {
        display: flex;
        justify-content: center;
    }

    .address {
        font-size: 14px;
        line-height: 20px;
        font-weight: bold;
        color: whitesmoke;
        &:hover {
            cursor: pointer;
        }
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
