<script lang="ts">
  import { watchlistTabs } from "$lib/stores/tabs";
  import { userData } from "$lib/stores/user";
  import { nodesData } from "$lib/stores/nodes";
  import UserService from "$lib/services/user";
  import Button from "$lib/components/Elements/Button.svelte";
  import MdRefresh from "svelte-icons/md/MdRefresh.svelte";
  import { isSyncing } from "$lib/stores/isSyncing";

  async function refreshNodesStats() {
    if ($isSyncing) return;
    const watchlist = await UserService.processNodes($userData.nodes);
    if (watchlist) {
      $nodesData = watchlist;
    }
  }
</script>

<div class="modulePool">
  <div class="module selector">
    <div class="tabs">
      {#each $watchlistTabs.available as tab}
        <div
          class="tab {$watchlistTabs.selected === tab.component
            ? 'active'
            : ''}"
          on:click={() => ($watchlistTabs.selected = tab.component)}
        >
          <span>{tab.name}</span>
        </div>
      {/each}
    </div>
    <div class="refresherOrb">
      <Button action={refreshNodesStats} icon={MdRefresh} size="26px" />
    </div>
  </div>
  <svelte:component this={$watchlistTabs.selected} />
</div>

<style lang="scss">
  .modulePool {
    width: 100%;
    gap: 0;
  }

  .module {
    width: 100%;
    flex-direction: row;
    font-size: 22px;
    justify-content: space-between;
  }

  .tabs {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .refresherOrb {
    justify-self: end;
  }

  .selector {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    display: flex;
    align-items: center;
  }

  .tab {
    font-size: 16px;
    font-weight: bold;
    color: rgb(95, 95, 95);
    transition-duration: 0.1s;
    padding: 20px;
    transition-duration: 0.3s;
    &.active,
    &:hover {
      background-color: rgb(31, 29, 29);
      border-radius: 20px;
      color: whitesmoke;
    }
    &:hover {
      color: whitesmoke;
      cursor: pointer;
    }
  }
</style>
