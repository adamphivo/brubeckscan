<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import StreamService from "$lib/services/stream";
  import Format from "$lib/helpers/format";
  import { logs } from "$lib/stores/streams/logs";

  onMount(async () => {
    await StreamService.logsStream.getAndSubscribe();
    StreamService.logsStream.scrollToBottom();
  });

  onDestroy(async () => {
    await StreamService.logsStream.unsubscribe();
    $logs = [];
  });
</script>

<section class="module" id="logs">
  {#each $logs as log}
    <div>
      <span>{Format.timestamp(log.metadata.messageId.timestamp)}</span>
      <span class={log.method}>{log.method}</span>
      {#if log.routeId.startsWith("api")}
        <span>INTERNAL</span>
        <span>{log.routeId.replace("api/", "")}</span>
      {:else}
        <span>{log.routeId}</span>
      {/if}
      {#if log.error}
        <span class="error">🐛</span>
        <span>{log.error.message}</span>
      {/if}
    </div>
  {/each}
</section>

<style lang="scss">
  .module {
    position: relative;
    width: 100%;
    height: 600px;
    overflow-y: hidden;
    border-radius: 0;
    background-color: rgb(0, 0, 0);
    color: rgb(126, 206, 220);
    gap: 5px;
    user-select: none;
    font-size: 12px;
  }

  .GET {
    color: rgb(59, 109, 158);
  }

  .PATCH {
    color: orange;
  }
</style>
