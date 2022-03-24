<script lang="ts">
    import Format from "$lib/helpers/format";
    import { userData, watchListData } from "$lib/stores/userData";
    import { marketPrices } from "$lib/stores/marketPrices";
    import Button from "$lib/components/HTMLElements/Button.svelte";
    import { send } from "$lib/helpers/send";
    import { brubeckData } from "$lib/stores/brubeckData";

    async function unwatch(address: string) {
        const response = await send("PATCH", "watchlist.json", {
            userAddress: $userData.address,
            nodeAddress: address,
            action: "unwatch",
        });

        const user = await response.json();

        if (user) {
            $watchListData = $watchListData.filter(
                (node) => node.address !== address
            );
        }

        $userData = user;
    }
</script>

{#if $watchListData}
    {#if $watchListData.length}
        <div class="module moduleTitle">
            <h3>Watchlist ({$watchListData.length})</h3>
        </div>
        <div class="module">
            <table>
                <thead>
                    <tr>
                        <th><p>ETH address</p></th>
                        <th><p>Rewards DATA</p></th>
                        <th><p>Rewards USDT</p></th>
                        <th><p>Staked DATA</p></th>
                        <th><p>Staked DATA in USDT</p></th>
                        <th><p>Claim count</p></th>
                        <th><p>Status</p></th>
                        <th><p /></th>
                    </tr>
                </thead>
                <tbody>
                    {#each $watchListData as node}
                        <tr>
                            <td
                                style:background={node.address === $userData.address ? $userData.profile.gradient : ""}
                                id={node.address}
                                class="address"
                            >
                                <p>
                                    {Format.shortenNodeAddress(node.address)}
                                </p>
                            </td>
                            <td>
                                <p>{node.rewardsInData}</p>
                            </td>
                            <td>
                                <p>
                                    {node.rewardsInData * $marketPrices.DATAUSDT}
                                </p>
                            </td>
                            <td>
                                <p
                                    class={node.dataStaked === 0 ||
                                    node.dataStaked > 10000
                                        ? "warning"
                                        : ""}
                                >
                                    {Format.tokenValue(node.dataStaked)}
                                </p>
                            </td>
                            <td>
                                <p>
                                    {node.dataStaked * $marketPrices.DATAUSDT}
                                </p>
                            </td>
                            <td><p>{node.claimCount}</p></td>

                            <!-- Status -->
                            <td>
                                {#if node?.claimedRewardCodes[0]?.id === $brubeckData?.lastCode}
                                    <p
                                        class="ok"
                                        title="Claimed the latest reward code"
                                    >
                                        OK
                                    </p>
                                {:else}
                                    <p
                                        class="ko"
                                        title="Did not claim the latest reward code"
                                    >
                                        KO
                                    </p>
                                {/if}
                            </td>

                            <!-- Actions -->
                            <td>
                                <div class="buttonContainer">
                                    {#if node.address != $userData.address}
                                        <Button
                                            text="Unwatch"
                                            action={() => unwatch(node.address)}
                                        />
                                    {:else}
                                        <div class="owner">Owner</div>
                                    {/if}
                                </div>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
{/if}

<style lang="scss">
    .module {
        width: 100%;
        padding: 0;
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
