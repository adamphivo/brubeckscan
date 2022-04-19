<script lang="ts">
  import Format from "$lib/helpers/format";
  import { marketPrices } from "$lib/stores/marketPrices";
  import { nodesDataTotals } from "$lib/stores/nodes";
  import { selectedOverviewCurrency } from "$lib/stores/selectedCurrency";
  import CurrencySelector from "$lib/components/Markets/CurrencySelector.svelte";
</script>

{#if $nodesDataTotals}
  <div class="module">
    <CurrencySelector store={selectedOverviewCurrency} />
    <h3>Totals</h3>
    <div class="data">
      <div class="label">
        <p>Staked</p>
      </div>
      <div class="value">
        {#if $selectedOverviewCurrency === "data"}
          <p>{Format.tokenValue($nodesDataTotals.totalDataStaked)}</p>
          <p class="currency {$selectedOverviewCurrency}">DATA</p>
        {:else if $selectedOverviewCurrency === "usdt"}
          <p>
            {Format.tokenValue(
              $nodesDataTotals.totalDataStaked * $marketPrices.DATAUSDT
            )}
          </p>
          <p class="currency {$selectedOverviewCurrency}">USDT</p>
        {:else if $selectedOverviewCurrency === "eur"}
          <p>
            {Format.tokenValue(
              ($nodesDataTotals.totalDataStaked * $marketPrices.DATAUSDT) /
                $marketPrices.EURUSDT
            )}
          </p>
          <p class="currency {$selectedOverviewCurrency}">EUR</p>
        {/if}
      </div>
    </div>
    <div class="separator" />
    <div class="data">
      <div class="label">
        <p>Accumulated rewards</p>
      </div>
      <div class="value {$selectedOverviewCurrency}">
        {#if $selectedOverviewCurrency === "data"}
          <p>{Format.twoDecimals($nodesDataTotals.totalRewardsInData)}</p>
          <p class="currency {$selectedOverviewCurrency}">DATA</p>
        {:else if $selectedOverviewCurrency === "usdt"}
          <p>
            {Format.tokenValue(
              $nodesDataTotals.totalRewardsInData * $marketPrices.DATAUSDT
            )}
          </p>
          <p class="currency {$selectedOverviewCurrency}">USDT</p>
        {:else if $selectedOverviewCurrency === "eur"}
          <p>
            {Format.tokenValue(
              ($nodesDataTotals.totalRewardsInData * $marketPrices.DATAUSDT) /
                $marketPrices.EURUSDT
            )}
          </p>
          <p class="currency {$selectedOverviewCurrency}">EUR</p>
        {/if}
      </div>
    </div>
    <div class="separator" />
    <div class="data">
      <div class="label">
        <p>Received rewards</p>
      </div>
      <div class="value {$selectedOverviewCurrency}">
        {#if $selectedOverviewCurrency === "data"}
          <p>{Format.twoDecimals($nodesDataTotals.totalDataSent)}</p>
          <p class="currency {$selectedOverviewCurrency}">DATA</p>
        {:else if $selectedOverviewCurrency === "usdt"}
          <p>
            {Format.twoDecimals(
              $nodesDataTotals.totalDataSent * $marketPrices.DATAUSDT
            )}
          </p>
          <p class="currency {$selectedOverviewCurrency}">USDT</p>
        {:else if $selectedOverviewCurrency === "eur"}
          <p>
            {Format.twoDecimals(
              ($nodesDataTotals.totalDataSent * $marketPrices.DATAUSDT) /
                $marketPrices.EURUSDT
            )}
          </p>
          <p class="currency {$selectedOverviewCurrency}">EUR</p>
        {/if}
      </div>
    </div>
    <div class="separator" />
    <div class="data">
      <div class="label">
        <p>Rewards to be received</p>
      </div>
      <div class="value {$selectedOverviewCurrency}">
        {#if $selectedOverviewCurrency === "data"}
          <p>
            {Format.twoDecimals(
              $nodesDataTotals.totalRewardsInData -
                $nodesDataTotals.totalDataSent
            )}
          </p>
          <p class="currency {$selectedOverviewCurrency}">DATA</p>
        {:else if $selectedOverviewCurrency === "usdt"}
          <p>
            {Format.twoDecimals(
              ($nodesDataTotals.totalRewardsInData -
                $nodesDataTotals.totalDataSent) *
                $marketPrices.DATAUSDT
            )}
          </p>
          <p class="currency {$selectedOverviewCurrency}">USDT</p>
        {:else if $selectedOverviewCurrency === "eur"}
          <p>
            {Format.twoDecimals(
              ($nodesDataTotals.totalRewardsInData -
                $nodesDataTotals.totalDataSent) *
                $marketPrices.DATAUSDT / $marketPrices.EURUSDT
            )}
          </p>
          <p class="currency {$selectedOverviewCurrency}">EUR</p>
        {/if}
      </div>
    </div>
    <div class="separator" />
    <div class="data">
      <div class="label">
        <p>Claim count</p>
      </div>
      <div class="value">
        <p>
          {$nodesDataTotals.totalClaimCount} reward code{$nodesDataTotals.totalClaimCount >
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
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    gap: 15px;
    border-radius: 0;
    padding-top: 0;
    @media (max-width: 1400px) {
      width: 100%;
    }
  }

  .currency.data {
    color: var(--color-orange);
  }

  .currency.usdt {
    color: var(--color-usdt);
  }

  .currency.eur {
    color: var(--color-eur);
  }

  h3 {
    font-size: 22px;
    margin-bottom: 30px;
  }
</style>
