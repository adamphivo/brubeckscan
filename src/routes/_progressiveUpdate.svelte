<script lang="ts">
  import { onMount } from "svelte";
  import UserService from "$lib/services/user";
  import StateService from "$lib/services/state";
  import { userData } from "$lib/stores/user";
  import { nodesData } from "$lib/stores/nodes";
  import { isSyncing } from "$lib/stores/isSyncing";

  onMount(() => {
    async function fetchData() {
      isSyncing.set(true);
      await StateService.updateBrubeckStats();
      await StateService.updateMarketPrices();
      if ($userData) {
        const watchlist = await UserService.processNodes($userData.nodes);
        if (watchlist) {
          nodesData.set(watchlist);
        }
      }
      isSyncing.set(false);
    }

    const interval = setInterval(fetchData, 10 * 1000);

    fetchData();

    return () => clearInterval(interval);
  });
</script>
