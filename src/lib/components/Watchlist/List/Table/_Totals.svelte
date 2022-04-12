<script lang="ts">
  import { watchListSummary } from "$lib/stores/userData";
  import { selectedNodesCurrency } from "$lib/stores/selectedCurrency";
  import { marketPrices } from "$lib/stores/marketPrices";
  import Format from "$lib/helpers/format";
</script>

<tr>
  <th>
    <div>Totals</div>
  </th>
  <td>{$watchListSummary.count} node{$watchListSummary.count > 1 ? "s" : ""}</td>
  <td>/</td>
  <td>
    <div class={$selectedNodesCurrency}>
      {#if $selectedNodesCurrency === "data"}
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
    <div class={$selectedNodesCurrency}>
      {#if $selectedNodesCurrency === "data"}
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
    <div class={$selectedNodesCurrency}>
      {#if $selectedNodesCurrency === "data"}
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
    <div class={$selectedNodesCurrency}>
      {#if $selectedNodesCurrency === "data"}
        <p>{Format.tokenValue($watchListSummary.totalDataStaked)}</p>
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
    height: 50px;
  }

  td div, th div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .data {
    color: var(--color-orange);
  }

  .usdt {
    color: rgb(100, 218, 161);
  }
</style>
