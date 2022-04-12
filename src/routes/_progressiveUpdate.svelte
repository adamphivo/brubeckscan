<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import StreamService from "$lib/services/stream";
  import UserService from "$lib/services/user";
  import StateService from "$lib/services/state";
  import { userData } from "$lib/stores/user";
  import { isSyncing } from "$lib/stores/isSyncing";

  function getRandom() {
    const randomY = Math.floor(Math.random() * 100) + 1 + "%";
    const randomX = Math.floor(Math.random() * 100) + 1 + "%";
    return { randomX, randomY };
  }

  onMount(() => {
    async function fetchData() {
      if (get(isSyncing) === true) return;
      isSyncing.set(true);
      await StateService.updateBrubeckStats();
      await StateService.updateMarketPrices();
      if ($userData) {
        const coordinates = getRandom();
        await StreamService.mapStream.publish({
          userGradient: $userData.profile.gradient,
          userAddress: $userData.address,
          posX: coordinates.randomX,
          posY: coordinates.randomY
        });
        await UserService.login($userData.address);
      }
      isSyncing.set(false);
    }

    const interval = setInterval(fetchData, 15 * 1000);

    fetchData();

    return () => clearInterval(interval);
  });
</script>
