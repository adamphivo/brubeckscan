<script lang="ts">
  import Navigation from "./_Navigation.svelte";
  import Connect from "$lib/components/Auth/Connect.svelte";
  import Syncer from "$lib/components/Elements/Syncer.svelte";
  import { userData } from "$lib/stores/user";
</script>

<header>
    <div>
      <Navigation />
    </div>
    <div>
      <Syncer />
      {#if !$userData}
        <Connect />
      {/if}
    </div>
</header>

<style lang="scss">
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    z-index: 2;
    top: 0;
    max-width: var(--site-max-width);
    width: 100%;
    background-color: var(--color-black-transparent);
    padding: 20px 0;
    min-height: 92px;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
    }
  }
</style>
