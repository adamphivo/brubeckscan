<script lang="ts">
  import StreamService from "$lib/services/stream";
  import { onMount, onDestroy } from "svelte";
  import Id from "../_id.svelte";

  onMount(async () => {
    await StreamService.mapStream.getAndSubscribe();
  });

  onDestroy(async () => {
    await StreamService.mapStream.unsubscribe();
  });
</script>

<section class="module">
  <div class="map" id="map" />
</section>

<Id stream={StreamService.mapStream} />

<style lang="scss">
  .module {
    position: relative;
    width: 100%;
    background-color: rgb(11, 10, 10);
    display: flex;
    border-radius: 0;
  }

  .map {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    position: relative;
    background-color: transparent;
    height: 600px;
  }
</style>
