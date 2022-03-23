<script lang="ts" context="module">
    import StateService from "$lib/services/state";

    export async function load() {
        await StateService.updateMarketPrices();
        return {};
    }
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
    <div class="module"></div>
    <Watchlist />
</div>

<style lang="scss">
    .module {
        flex-grow: 1;
    }
</style>
