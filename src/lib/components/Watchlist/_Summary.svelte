<script lang="ts">
    import Format from "$lib/helpers/format";
    import { marketPrices } from "$lib/stores/marketPrices";
    import { watchListSummary } from "$lib/stores/userData";
    import Usdt from "$lib/components/HTMLElements/Logos/_Tether.svelte";
    import Data from "$lib/components/HTMLElements/Logos/_Data.svelte";
</script>

{#if $watchListSummary}
    <div class="module moduleTitle">
        <h3>Summary</h3>
    </div>
    <div class="module">
        <div class="data">
            <div class="label">
                <p>Total accumulated claim count</p>
            </div>
            <div class="value">
                <p>
                    {$watchListSummary.totalClaimCount} reward code{$watchListSummary.totalClaimCount >
                    1
                        ? "s"
                        : ""}
                </p>
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>Total accumulated rewards in DATA</p>
            </div>
            <div class="value">
                <p>{$watchListSummary.totalRewardsInData}</p>
                <p>DATA</p>
                <Data />
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>Total accumulated rewards in USDT</p>
            </div>
            <div class="value">
                <p>
                    {Format.tokenValue(
                        $watchListSummary.totalRewardsInData *
                            $marketPrices.DATAUSDT
                    )}
                </p>
                <p>USDT</p>
                <Usdt />
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>Total DATA staked</p>
            </div>
            <div class="value">
                <p>{Format.tokenValue($watchListSummary.totalDataStaked)}</p>
                <p>DATA</p>
                <Data />
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>Total staked value in USDT</p>
            </div>
            <div class="value">
                <p>
                    {Format.tokenValue(
                        $watchListSummary.totalDataStaked *
                            $marketPrices.DATAUSDT
                    )}
                </p>
                <p>USDT</p>
                <Usdt />
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
    .module {
        width: 50%;
        gap: 15px;
    }
</style>
