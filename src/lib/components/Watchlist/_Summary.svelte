<script lang="ts">
    import Format from "$lib/helpers/format";
    import { marketPrices } from "$lib/stores/marketPrices";
    import { watchListSummary } from "$lib/stores/userData";
    import Usdt from "$lib/components/Branding/Logos/_Tether.svelte";
    import Data from "$lib/components/Branding/Logos/_Data.svelte";
</script>

{#if $watchListSummary}
    <div class="module">
        <div class="data">
            <div class="label">
                <p>Accumulated rewards in DATA</p>
            </div>
            <div class="value">
                <p>{Format.twoDecimals($watchListSummary.totalRewardsInData)}</p>
                <p>DATA</p>
                <Data />
            </div>
        </div>
        <div class="separator"></div>
        <div class="data">
            <div class="label">
                <p>Accumulated rewards in USDT</p>
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
        <div class="separator"></div>
        <div class="data">
            <div class="label">
                <p>DATA staked</p>
            </div>
            <div class="value">
                <p>{Format.tokenValue($watchListSummary.totalDataStaked)}</p>
                <p>DATA</p>
                <Data />
            </div>
        </div>
        <div class="separator"></div>
        <div class="data">
            <div class="label">
                <p>Stake value in USDT</p>
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
        <div class="separator"></div>
        <div class="data">
            <div class="label">
                <p>Accumulated claim count</p>
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
    </div>
{/if}

<style lang="scss">
    .module {
        width: 50%;
        display: flex;
        justify-content: space-evenly;
        gap: 15px;
        border-radius: 0;
        @media (max-width: 1400px){
            width: 100%;
        }
    }
</style>
