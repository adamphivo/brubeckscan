<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import UserService from "$lib/services/user";
  import StateService from "$lib/services/state";
  import { userData } from "$lib/stores/user";
  import { nodesData } from "$lib/stores/nodes";
  import { isSyncing } from "$lib/stores/isSyncing";

  onMount(() => {
    async function fetchData() {
      if (get(isSyncing) === true) return;
      isSyncing.set(true);
      await StateService.updateBrubeckStats();
      await StateService.updateMarketPrices();
      if ($userData) {
        await UserService.login($userData.address);
      }
      isSyncing.set(false);
    }

    const interval = setInterval(fetchData, 15 * 1000);

    fetchData();

    return () => clearInterval(interval);
  });
</script>
