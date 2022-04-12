<script lang="ts">
  import { map } from "$lib/stores/streams/map";
  import Point from "./_Point.svelte";
</script>

<section class="module">
  <div class="map">
    {#each $map as item}
      <div>
        <Point content={item} />
      </div>
    {/each}
  </div>
</section>

<style lang="scss">
  .module {
    position: relative;
    width: 100%;
    background-color: black;
    display: flex;
    border-radius: 0;
  }

  .map {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 700px;
    overflow: hidden;
  }
</style>
