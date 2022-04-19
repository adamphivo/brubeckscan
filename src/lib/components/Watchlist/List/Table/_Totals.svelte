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
      {:else if $selectedNodesCurrency === "usdt"}
        <p>
          {Format.tokenValue(
            $nodesDataTotals.totalRewardsInData * $marketPrices.DATAUSDT
          )}
        </p>
      {:else if $selectedNodesCurrency === "eur"}
        <p>
          {Format.tokenValue(
            ($nodesDataTotals.totalRewardsInData * $marketPrices.DATAUSDT) /
              $marketPrices.EURUSDT
          )}
        </p>
      {/if}
    </div>
  </td>
  <td>
    <div class={$selectedNodesCurrency}>
      {#if $selectedNodesCurrency === "data"}
        <p>{Format.twoDecimals($nodesDataTotals.totalDataSent)}</p>
      {:else if $selectedNodesCurrency === "usdt"}
        <p>
          {Format.tokenValue(
            $nodesDataTotals.totalDataSent * $marketPrices.DATAUSDT
          )}
        </p>
      {:else if $selectedNodesCurrency === "eur"}
        <p>
          {Format.tokenValue(
            ($nodesDataTotals.totalDataSent * $marketPrices.DATAUSDT) /
              $marketPrices.EURUSDT
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
            $nodesDataTotals.totalRewardsInData - $nodesDataTotals.totalDataSent
          )}
        </p>
      {:else if $selectedNodesCurrency === "usdt"}
        <p>
          {Format.tokenValue(
            ($nodesDataTotals.totalRewardsInData -
              $nodesDataTotals.totalDataSent) *
              $marketPrices.DATAUSDT
          )}
        </p>
      {:else if $selectedNodesCurrency === "eur"}
        <p>
          {Format.tokenValue(
            (($nodesDataTotals.totalRewardsInData -
              $nodesDataTotals.totalDataSent) *
              $marketPrices.DATAUSDT) /
              $marketPrices.EURUSDT
          )}
        </p>
      {/if}
    </div>
  </td>
  <td>
    <div class={$selectedNodesCurrency}>
      {#if $selectedNodesCurrency === "data"}
        <p>{Format.tokenValue($nodesDataTotals.totalDataStaked)}</p>
      {:else if $selectedNodesCurrency === "usdt"}
        <p>
          {Format.tokenValue(
            $nodesDataTotals.totalDataStaked * $marketPrices.DATAUSDT
          )}
        </p>
      {:else if $selectedNodesCurrency === "eur"}
        <p>
          {Format.tokenValue(
            ($nodesDataTotals.totalDataStaked * $marketPrices.DATAUSDT) /
              $marketPrices.EURUSDT
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

  td div,
  th div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .data {
    color: var(--color-orange);
  }

  .usdt {
    color: var(--color-usdt);
  }

  .eur {
    color: var(--color-eur);
  }
</style>
