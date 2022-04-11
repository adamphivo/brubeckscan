<script lang="ts">
  import { watchListSummary } from "$lib/stores/userData";
  import { selectedCurrency } from "$lib/stores/selectedCurrency";
  import { marketPrices } from "$lib/stores/marketPrices";
  import Format from "$lib/helpers/format";
  console.log($watchListSummary);
</script>

<tr>
  <th>
    <div>Totals</div>
  </th>
  <td>/</td>
  <td>/</td>
  <td>
    <div class={$selectedCurrency}>
      {#if $selectedCurrency === "data"}
        <p>{Format.twoDecimals($watchListSummary.totalRewardsInData)}</p>
      {:else}
        <p>
          {Format.tokenValue(
            $watchListSummary.totalRewardsInData * $marketPrices.DATAUSDT
          )}
        </p>
      {/if}
    </div>
  </td>
  <td>
    <div class={$selectedCurrency}>
      {#if $selectedCurrency === "data"}
        <p>{Format.twoDecimals($watchListSummary.totalDataSent)}</p>
      {:else}
        <p>
          {Format.tokenValue(
            $watchListSummary.totalDataSent * $marketPrices.DATAUSDT
          )}
        </p>
      {/if}
    </div>
  </td>
  <td>
    <div class={$selectedCurrency}>
      {#if $selectedCurrency === "data"}
        <p>
          {Format.twoDecimals(
            $watchListSummary.totalRewardsInData -
              $watchListSummary.totalDataSent
          )}
        </p>
      {:else}
        <p>
          {Format.tokenValue(
            ($watchListSummary.totalRewardsInData -
              $watchListSummary.totalDataSent) *
              $marketPrices.DATAUSDT
          )}
        </p>
      {/if}
    </div>
  </td>
  <td>
    <div class={$selectedCurrency}>
      {#if $selectedCurrency === "data"}
        <p>{Format.twoDecimals($watchListSummary.totalDataStaked)}</p>
      {:else}
        <p>
          {Format.tokenValue(
            $watchListSummary.totalDataStaked * $marketPrices.DATAUSDT
          )}
        </p>
      {/if}
    </div>
  </td>
  <td>
    <div>
      {$watchListSummary.totalClaimCount}
    </div>
  </td>
  <td />
</tr>

<style lang="scss">
  th,
  td {
    text-align: center;
    padding: 20px;
  }

  td div, th div {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }

  .data {
    color: var(--color-orange);
  }

  .usdt {
    color: rgb(100, 218, 161);
  }
</style>
