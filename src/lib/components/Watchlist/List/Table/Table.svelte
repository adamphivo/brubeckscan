<script lang="ts">
  import Row from "$lib/components/Watchlist/List/Table/Row.svelte";
  import { nodesData } from "$lib/stores/nodes";
  import QuickAddNode from "./_QuickAddNode.svelte";
  import Totals from "./_Totals.svelte";
  import CurrencySelector from "$lib/components/Markets/CurrencySelector.svelte";
  import { selectedNodesCurrency as store } from "$lib/stores/selectedCurrency";
</script>

{#if $nodesData}
  {#if $nodesData.length}
    <div class="module">
      <CurrencySelector {store} />
    </div>
    <div class="table">
      <table>
        <thead>
          <tr>
            <th><div>ETH address</div></th>
            <th><div>Node Name</div></th>
            <th><div>Status</div></th>
            <th><div>Total rewards</div></th>
            <th><div>Already received</div></th>
            <th><div>To be received</div></th>
            <th><div>Staked</div></th>
            <th><div>Claim count</div></th>
            <th><div>Payouts</div></th>
            <th><div>Actions</div></th>
          </tr>
          <Totals />
        </thead>
        <tbody>
          {#each $nodesData as node}
            <Row {node} />
          {/each}
        </tbody>
      </table>
    </div>
    <QuickAddNode />
  {/if}
{/if}

<style lang="scss">
  table {
    width: 1700px;
  }
  .table {
    width: 100%;
    padding: 0;
    max-width: 100%;
    overflow-x: scroll;
    border-radius: 0;
    scroll-behavior: smooth;
  }

  .module {
    width: 100%;
    border-radius: 0;
  }

  th div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
</style>
