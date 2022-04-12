<script lang="ts">
  import Navigation from "./_Navigation.svelte";
  import Connect from "./_Connect.svelte";
  import Syncer from "$lib/components/Elements/Syncer.svelte";
  import { userData } from "$lib/stores/user";
  import { brubeckData } from "$lib/stores/brubeckData";
</script>

<header>
  <div class="row">
    <div class="logo">
      <h1>BrubeckScan</h1>
      <div class="apy">
        {$brubeckData.apy["24h-APY"]}<span class="percent">%</span> APY
      </div>
    </div>
    <div class="right">
      {#if !$userData}
        <Connect />
      {/if}
      <Syncer />
    </div>
  </div>
  <div class="row">
    <Navigation />
  </div>
</header>

<style lang="scss">
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: sticky;
    z-index: 2;
    top: 0;
    width: 100%;
    background-color: var(--color-black-transparent);
    max-width: var(--site-max-width);
  }
  .percent {
    color: var(--color-orange);
  }
  .right {
    display: flex;
    flex-direction: row-reverse;
    gap: 20px;
  }
  .apy {
    padding: 7px;
    border: 1px solid lightgray;
    font-size: 12px;
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  .row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
    // height: 75px;
    @media (max-width: 1400px) {
      max-width: 100%;
      padding: 20px;
    }
  }

  h1 {
    font-weight: 800;
    font-size: 20px;
  }
</style>
