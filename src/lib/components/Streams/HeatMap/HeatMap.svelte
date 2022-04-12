<script lang="ts">
  import Point from "./_Point.svelte";
</script>

<section class="module">
  <div class="map" id="map" />
</section>

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
    height: 500px;
  }
</style>
