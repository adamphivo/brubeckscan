<script lang="ts">
    import { brubeckData } from "$lib/stores/brubeckData";
    import { marketPrices } from "$lib/stores/marketPrices";
    import Usdt from "$lib/modules/Components/Logos/_Tether.svelte";
    import Data from "$lib/modules/Components/Logos/_Data.svelte";
    import Format from "$lib/helpers/format";
</script>

{#if $brubeckData.apy}
    <div class="module moduleTitle">
        <h3>Brubeck status</h3>
    </div>
    <div class="module">
        <div class="data">
            <div class="label">
                <p>24H APR</p>
            </div>
            <div class="value">
                <p>
                    {$brubeckData.apy["24h-APR"]}
                </p>
                <span>%</span>
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>SPOT APR</p>
            </div>
            <div class="value">
                <p>{$brubeckData.apy["spot-APR"]}</p>
                <span>%</span>
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>24H APY</p>
            </div>
            <div class="value">
                <p>
                    {$brubeckData.apy["24h-APY"]}
                </p>
                <span>%</span>
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>SPOT APY</p>
            </div>
            <div class="value">
                <p>
                    {$brubeckData.apy["spot-APY"]}
                </p>
                <span>%</span>
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>24h-data-staked</p>
            </div>
            <div class="value">
                <p>{Format.tokenValue($brubeckData.apy["24h-data-staked"])}</p>
                <p>DATA</p>
                <Data />
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>24h-data-staked USDT</p>
            </div>
            <div class="value">
                {Format.tokenValue(
                    $brubeckData.apy["24h-data-staked"] * $marketPrices.DATAUSDT
                )}
                <p>USDT</p>
                <Usdt />
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>spot-data-staked</p>
            </div>
            <div class="value">
                <p>{Format.tokenValue($brubeckData.apy["spot-data-staked"])}</p>
                <p>DATA</p>
                <Data />
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>spot-data-staked USDT</p>
            </div>
            <div class="value">
                <p>
                    {Format.tokenValue(
                        $brubeckData.apy["spot-data-staked"] *
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
        gap: 10px;
        width: 100%;
    }
    span {
        color: rgb(59, 212, 59);
    }
</style>
