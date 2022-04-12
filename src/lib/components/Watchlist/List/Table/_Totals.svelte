<script lang="ts">
  import { nodesDataTotals } from "$lib/stores/nodes";
  import { selectedNodesCurrency } from "$lib/stores/selectedCurrency";
  import { marketPrices } from "$lib/stores/marketPrices";
  import Format from "$lib/helpers/format";
</script>

<tr>
  <th>
    <div>Totals</div>
  </th>
  <td>{$nodesDataTotals.count} node{$nodesDataTotals.count > 1 ? "s" : ""}</td>
  <td>/</td>
  <td>
    <div class={$selectedNodesCurrency}>
      {#if $selectedNodesCurrency === "data"}
        <p>{Format.twoDecimals($nodesDataTotals.totalRewardsInData)}</p>
      {:else}
        <p>
          {Format.tokenValue(
            $nodesDataTotals.totalRewardsInData * $marketPrices.DATAUSDT
          )}
        </p>
      {/if}
    </div>
  </td>
  <td>
    <div class={$selectedNodesCurrency}>
      {#if $selectedNodesCurrency === "data"}
        <p>{Format.twoDecimals($nodesDataTotals.totalDataSent)}</p>
      {:else}
        <p>
          {Format.tokenValue(
            $nodesDataTotals.totalDataSent * $marketPrices.DATAUSDT
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
            $nodesDataTotals.totalRewardsInData -
              $nodesDataTotals.totalDataSent
          )}
        </p>
      {:else}
        <p>
          {Format.tokenValue(
            ($nodesDataTotals.totalRewardsInData -
              $nodesDataTotals.totalDataSent) *
              $marketPrices.DATAUSDT
          )}
        </p>
      {/if}
    </div>
  </td>
  <td>
    <div class={$selectedNodesCurrency}>
      {#if $selectedNodesCurrency === "data"}
        <p>{Format.tokenValue($nodesDataTotals.totalDataStaked)}</p>
      {:else}
        <p>
          {Format.tokenValue(
            $nodesDataTotals.totalDataStaked * $marketPrices.DATAUSDT
          )}
        </p>
      {/if}
    </div>
  </td>
  <td>
    <div>
      {$nodesDataTotals.totalClaimCount}
    </div>
  </td>
  <td />
</tr>

<style lang="scss">
  tr {
    background-color: rgb(36, 36, 36);
  }
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
