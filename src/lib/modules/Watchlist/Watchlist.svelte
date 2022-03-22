<script lang="ts">
    import { userDataComputed } from "$lib/stores/userData";
    import { marketPrices } from "$lib/stores/marketPrices";
</script>

{#if $userDataComputed}
    {#if $userDataComputed.length}
        <div class="module moduleTitle">
            <h3>Watchlist</h3>
        </div>
        <div class="module">
            {#each $userDataComputed as node}
                <div class="module">
                    <div>Address{node.address}</div>
                    <div>DataStaked{node.dataStaked}</div>
                    <div>
                        DataStakedInUSDT{node.dataStaked *
                            $marketPrices.DATAUSDT}
                    </div>
                    <div>
                        RewardsInData{node.rewardsInData}
                    </div>
                    <div>
                        RewardsInUSDT{node.rewardsInData *
                            $marketPrices.DATAUSDT}
                    </div>
                    <div>ClaimCount{node.claimCount}</div>
                </div>
            {/each}
        </div>
    {/if}
{/if}

<style lang="scss">
    .module {
        width: 100%;
    }
</style>
