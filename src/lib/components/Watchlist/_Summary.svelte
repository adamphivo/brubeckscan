<script lang="ts">
  import Format from "$lib/helpers/format";
  import { marketPrices } from "$lib/stores/marketPrices";
  import { watchListSummary } from "$lib/stores/userData";
  import Usdt from "$lib/components/Branding/Logos/_Tether.svelte";
  import Data from "$lib/components/Branding/Logos/_Data.svelte";
  import { selectedOverviewCurrency } from "$lib/stores/selectedCurrency";
  import CurrencySelector from "./_CurrencySelector.svelte";
</script>

{#if $watchListSummary}
  <div class="module">
    <!-- <h2>Summary</h2> -->
    <CurrencySelector />
    <!-- Staked -->
    <div class="data">
      <div class="label">
        <p>Staked</p>
      </div>
      <div class="value">
        {#if $selectedOverviewCurrency === "data"}
          <p>{Format.tokenValue($watchListSummary.totalDataStaked)}</p>
          <p>DATA</p>
          <Data />
        {:else}
          <p>
            {Format.tokenValue(
              $watchListSummary.totalDataStaked * $marketPrices.DATAUSDT
            )}
          </p>
          <p>USDT</p>
          <Usdt />
        {/if}
      </div>
    </div>
    <div class="separator" />
    <!-- Accumulated Rewards -->
    <div class="data">
      <div class="label">
        <p>Accumulated rewards</p>
      </div>
      <div class="value">
        {#if $selectedOverviewCurrency === "data"}
          <p>{Format.twoDecimals($watchListSummary.totalRewardsInData)}</p>
          <p>DATA</p>
          <Data />
        {:else}
          <p>
            {Format.tokenValue(
              $watchListSummary.totalRewardsInData * $marketPrices.DATAUSDT
            )}
          </p>
          <p>USDT</p>
          <Usdt />
        {/if}
      </div>
    </div>

    <div class="separator" />
    <div class="data">
      <div class="label">
        <p>Received rewards</p>
      </div>
      <div class="value">
        {#if $selectedOverviewCurrency === "data"}
          <p>{Format.twoDecimals($watchListSummary.totalDataSent)}</p>
          <p>DATA</p>
          <Data />
        {:else}
          <p>
            {Format.twoDecimals(
              $watchListSummary.totalDataSent * $marketPrices["DATAUSDT"]
            )}
          </p>
          <p>USDT</p>
          <Usdt />
        {/if}
      </div>
    </div>
    <div class="separator" />
    <div class="data">
      <div class="label">
        <p>Rewards to be received</p>
      </div>
      <div class="value">
        {#if $selectedOverviewCurrency === "data"}
          <p>
            {Format.twoDecimals(
              $watchListSummary.totalRewardsInData -
                $watchListSummary.totalDataSent
            )}
          </p>
          <p>DATA</p>
          <Data />
        {:else}
          <p>
            {Format.twoDecimals(
              ($watchListSummary.totalRewardsInData -
                $watchListSummary.totalDataSent) *
                $marketPrices["DATAUSDT"]
            )}
          </p>
          <p>USDT</p>
          <Usdt />
        {/if}
      </div>
    </div>
    <div class="separator" />
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
    @media (max-width: 1400px) {
      width: 100%;
    }
  }
</style>
