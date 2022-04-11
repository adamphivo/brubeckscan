<script lang="ts">
  import { onMount } from "svelte";
  import StateService from "$lib/services/state";
  import { userData, watchListData } from "$lib/stores/userData";
  import { send } from "$lib/helpers/send";
  import UserService from "$lib/services/user";

  onMount(() => {
    async function fetchData() {
      await StateService.updateBrubeckStats();
      await StateService.updateMarketPrices();
      if ($userData) {
        const response = await send("PATCH", `users/${$userData.address}.json`);
        const user = await response.json();
        const watchlist = await UserService.getWatchlist(user.nodes);
        if (watchlist) {
          watchListData.set(watchlist);
        }
      }
    }

    const interval = setInterval(fetchData, 60 * 1000);
    fetchData();

    return () => clearInterval(interval);
  });
</script>
