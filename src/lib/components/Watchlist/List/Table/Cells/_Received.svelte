<script lang="ts">
  import { selectedNodesCurrency } from "$lib/stores/selectedCurrency";
  import { marketPrices } from "$lib/stores/marketPrices";
  import Format from "$lib/helpers/format";
  export let node;
</script>

<td>
  {#if $selectedNodesCurrency === "data"}
    <div class="dataC">
      {Format.twoDecimals(node.dataSent)}
    </div>
  {:else if $selectedNodesCurrency === "usdt"}
    <div class="usdt">
      {Format.twoDecimals(node.dataSent * $marketPrices.DATAUSDT)}
    </div>
  {:else if $selectedNodesCurrency === "eur"}
    <div class="eur">
      {Format.twoDecimals(node.dataSent * $marketPrices.DATAUSDT / $marketPrices.EURUSDT)}
    </div>
  {/if}
</td>

<style lang="scss">
  div {
    text-align: center;
  }
  .dataC {
    color: var(--color-orange);
  }

  .usdt {
    color: rgb(100, 218, 161);
  }

  .eur {
    color: var(--color-eur);
  }
</style>
