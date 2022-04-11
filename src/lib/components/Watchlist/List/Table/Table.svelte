<script lang="ts">
  import Row from "$lib/components/Watchlist/List/Table/Row.svelte";
  import { watchListData } from "$lib/stores/userData";
  import QuickAddNode from "./_QuickAddNode.svelte";
  import Configuration from "./Configuration.svelte";
  import Totals from "./_Totals.svelte";
</script>

{#if $watchListData}
  {#if $watchListData.length}
    <Configuration />
    <div class="module">
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
            <th><div>Actions</div></th>
          </tr>
        </thead>
        <tbody>
          {#each $watchListData as node}
            <Row {node} />
          {/each}
        </tbody>
        <tfoot>
          <Totals />
        </tfoot>
      </table>
    </div>
    <QuickAddNode />
  {/if}
{/if}

<style lang="scss">
  table {
    width: 1600px;
  }
  .module {
    width: 100%;
    padding: 0;
    max-width: 100%;
    overflow-x: scroll;
    border-radius: 0;
  }

  th div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  tfoot {
      background-color: rgb(0, 0, 0);
      border-top: 5px solid white;
  }
</style>
