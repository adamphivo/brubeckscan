<script lang="ts">
  import { onMount } from "svelte";
  import StateService from "$lib/services/state";
  import { userData } from "$lib/stores/user";
  import { nodesData } from "$lib/stores/nodes";
  import UserService from "$lib/services/user";

  onMount(() => {
    async function fetchData() {
      await StateService.updateBrubeckStats();
      await StateService.updateMarketPrices();
      if ($userData) {
        const watchlist = await UserService.processNodes($userData.nodes);
        if (watchlist) {
          nodesData.set(watchlist);
        }
      }
    }

    const interval = setInterval(fetchData, 60 * 1000);

    fetchData();

    return () => clearInterval(interval);
  });
</script>
