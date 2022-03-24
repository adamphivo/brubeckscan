<script lang="ts">
    import Row from "$lib/components/Watchlist/Table/_Row.svelte";
    import { userData, watchListData } from "$lib/stores/userData";
    import { send } from "$lib/helpers/send";

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
        <div class="module">
            <table>
                <col style="width:15%">
                <col style="width:30%">
                <col>
                <col>
                <col>
                <col>
                <col>
                <col>
                <col style="width: 10%">
                <thead>
                    <tr>
                        <th><p>ETH address</p></th>
                        <th><p>Name</p></th>
                        <th><p>Rewards DATA</p></th>
                        <th><p>Rewards USDT</p></th>
                        <th><p>Staked DATA</p></th>
                        <th><p>Staked USDT</p></th>
                        <th><p>Claim count</p></th>
                        <th><p>Status</p></th>
                        <th><p /></th>
                    </tr>
                </thead>
                <tbody>
                    {#each $watchListData as node}
                        <Row {node} />
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
{/if}

<style lang="scss">
    .module {
        padding: 0;
        width: 100%;
    }
</style>
