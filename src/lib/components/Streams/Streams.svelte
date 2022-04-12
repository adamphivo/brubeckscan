<script lang="ts">
  import { streamTabs } from "$lib/stores/tabs";
</script>

<section>
  <div class="module selector">
    {#each $streamTabs.available as tab}
      <div
        class="tab {$streamTabs.selected === tab.component ? 'active' : ''}"
        on:click={() => ($streamTabs.selected = tab.component)}
      >
        <span>{tab.name}</span>
      </div>
    {/each}
  </div>
  <svelte:component this={$streamTabs.selected} />
</section>

<style lang="scss">
  .selector {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    display: flex;
    flex-direction: row;
    width: 100%;
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
