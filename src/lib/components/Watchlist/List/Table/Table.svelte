<script lang="ts">
  import Row from "$lib/components/Watchlist/List/Table/Row.svelte";
  import { nodesData } from "$lib/stores/nodes";
  import QuickAddNode from "./_QuickAddNode.svelte";
  import Configuration from "./Configuration.svelte";
  import Totals from "./_Totals.svelte";

  function handleWheel(event){
    const table = document.querySelector('#table');
    if(event.deltaY > 0) {
      table.scrollLeft += 200;
    } else {
      table.scrollLeft -= 200;
    }
  }
</script>

{#if $nodesData}
  {#if $nodesData.length}
    <Configuration />
    <div class="module" on:wheel|preventDefault={handleWheel} id="table">
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
  .module {
    width: 100%;
    padding: 0;
    max-width: 100%;
    overflow-x: scroll;
    border-radius: 0;
    scroll-behavior: smooth;
  }

  th div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
</style>
