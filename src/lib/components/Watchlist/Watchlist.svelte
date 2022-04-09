<script lang="ts">
    import { watchlistTabs } from "$lib/stores/selectedTabs";
</script>

<div class="modulePool">
    <div class="module selector">
        {#each $watchlistTabs.available as tab}
        <div
          class="tab {$watchlistTabs.selected === tab.component ? 'active' : ''}"
          on:click={() => ($watchlistTabs.selected = tab.component)}
        >
          <span>{tab.name}</span>
        </div>
      {/each}
    </div>
    <svelte:component this={$watchlistTabs.selected}/>
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

