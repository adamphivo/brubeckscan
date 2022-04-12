<script lang="ts">
  import { fade } from "svelte/transition";
  import { BarLoader } from "svelte-loading-spinners";
  import { isSyncing } from "$lib/stores/isSyncing";
</script>

{#if $isSyncing}
  <div transition:fade>
    <BarLoader color="#F65F0A" />
  </div>
{/if}

<style lang="scss">
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
</style>
