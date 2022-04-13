<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import StateService from "$lib/services/state";
  import { userData } from "$lib/stores/user";
  import { isSyncing } from "$lib/stores/isSyncing";

  onMount(() => {
    async function fetchData() {
      if (get(isSyncing) === true) return;
      isSyncing.set(true);
      await StateService.updateBrubeckStats();
      await StateService.updateMarketPrices();
      await StateService.syncUser($userData || null);
      isSyncing.set(false);
    }

    const interval = setInterval(fetchData, 15 * 1000);

    fetchData();

    return () => clearInterval(interval);
  });
</script>
