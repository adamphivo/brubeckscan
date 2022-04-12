<script lang="ts">
  import { selectedNodesCurrency } from "$lib/stores/selectedCurrency";
  import { marketPrices } from "$lib/stores/marketPrices";
  import Format from "$lib/helpers/format";
  export let node;
</script>

<td>
  {#if $selectedNodesCurrency === "data"}
    <div class="dataC">
      {Format.twoDecimals(node.rewardsInData - node.dataSent)}
    </div>
  {:else}
    <div class="usdt">
      {Format.twoDecimals(
        (node.rewardsInData - node.dataSent) * $marketPrices["DATAUSDT"]
      )}
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
</style>
