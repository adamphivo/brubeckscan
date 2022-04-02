<script context="module" lang="ts">
</script>

<script lang="ts">
    import Graph from "$lib/components/Watchlist/_Graph.svelte";
    import Watchlist from "$lib/components/Watchlist/Watchlist.svelte";
    import Summary from "$lib/components/Watchlist/_Summary.svelte";
</script>

<div class="modulePool">
    <Watchlist />
    <Summary />
    <Graph />
</div>

<style lang="scss">
    .modulePool {
        width: 100%;
    }
</style>
