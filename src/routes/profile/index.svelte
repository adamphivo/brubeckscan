<script lang="ts">
  import { onMount } from "svelte";
  import { userData } from "$lib/stores/user";
  import Watchlist from "$lib/components/Watchlist/Watchlist.svelte";
  import { goto } from "$app/navigation";
  onMount(async () => {
    if (!$userData) {
      goto("/");
    }
  });
</script>

{#if $userData}
  <div class="modulePool">
    <Watchlist />
  </div>
{/if}

<style lang="scss">
  .modulePool {
    width: 100%;
    gap: 0;
  }
</style>
