<script lang="ts">
  import { watchlistTabs } from "$lib/stores/tabs";
  import { userData, watchListData } from "$lib/stores/userData";
  import UserService from "$lib/services/user";
  import Button from "$lib/components/Elements/Button.svelte";
  import MdRefresh from "svelte-icons/md/MdRefresh.svelte";

  async function refreshWatchList() {
    const watchlist = await UserService.processNodes($userData.nodes);
    if (watchlist) {
      $watchListData = watchlist;
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
      <Button action={refreshWatchList} icon={MdRefresh} size="22px" />
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
    gap: 50px;
    align-items: center;
  }

  .refresherOrb {
    justify-self: end;
  }

  .selector {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .tab {
    font-size: 22px;
    color: rgb(95, 95, 95);
    transition-duration: 0.1s;
    padding-bottom: 20px;
    border-bottom: 5px solid transparent;
    &.active {
      color: whitesmoke;
      border-bottom: 5px solid whitesmoke;
    }
    &:hover {
      color: whitesmoke;
      cursor: pointer;
    }
  }
</style>
