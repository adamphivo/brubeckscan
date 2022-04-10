<script lang="ts" context="module">
  import { get } from "svelte/store";
  import { userData } from "$lib/stores/userData";
  export async function load() {
    if(get(userData)){
      return {}
    } else {
      return {
        status: 302,
        redirect: "/"
      };
    }
  }
</script>

<script lang="ts">
  import Watchlist from "$lib/components/Watchlist/Watchlist.svelte";
</script>

<div class="modulePool">
  <Watchlist />
</div>

<style lang="scss">
  .modulePool {
    width: 100%;
    gap: 0;
  }
</style>
