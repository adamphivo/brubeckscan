<script lang="ts">
    import Format from "$lib/helpers/format";
    import { userData, watchListData } from "$lib/stores/userData";
    import { send } from "$lib/helpers/send";
    import FeedService from "$lib/services/feeds";
    import Button from "$lib/components/HTMLElements/Button.svelte";

    export let node;

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

<style lang="scss">
    .buttonContainer {
        display: flex;
        justify-content: center;
        gap: 10px;
        padding: 20px;
    }

    .owner {
        color: rgb(67, 233, 205);
        font-weight: bold;
        font-size: 18px;
    }

    p.warning {
        color: rgb(226, 162, 88);
    }
</style>
