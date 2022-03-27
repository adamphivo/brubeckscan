<script lang="ts">
    import Row from "$lib/components/Watchlist/Table/Row.svelte";
    import { watchListData } from "$lib/stores/userData";
</script>

{#if $watchListData}
    {#if $watchListData.length}
        <div class="module">
            <table>
                <thead>
                    <tr>
                        <th><div>ETH address</div></th>
                        <th><div>Node Name</div></th>
                        <th><div>Rewards</div></th>
                        <th><div>Stake</div></th>
                        <th><div>Claim count</div></th>
                        <th><div>Status</div></th>
                        <th><div>Actions</div></th>
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
        width: 100%;
        padding: 0;
        max-width: 100%;
        overflow-x: scroll;
        overflow-y: scroll;
        max-height: 700px;
    }

    th div {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    table {
        width: 1400px;
    }
</style>
