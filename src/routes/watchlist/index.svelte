<script lang="ts" context="module">
</script>

<script lang="ts">
    import Watchlist from "$lib/modules/Watchlist/Watchlist.svelte";
    import PageTitle from "$lib/modules/Layout/Page/PageTitle.svelte";
    import Summary from "$lib/modules/Watchlist/_Summary.svelte";
    const TITLE = "Watchlist";
</script>

<div class="modulePool">
    <PageTitle title={TITLE} />
    <Summary />
    <Watchlist />
</div>

<style lang="scss">
</style>
