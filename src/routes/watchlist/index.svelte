<script context="module" lang="ts">
    import { get } from "svelte/store";
    import { userData } from "$lib/stores/userData";

    export async function load({ request, params }) {
        if (!get(userData)) {
            return {
                status: 301,
                redirect: "/",
            };
        }
        return {};
    }
</script>

<script lang="ts">
    import Graph from "$lib/components/Watchlist/_Graph.svelte";
    import Watchlist from "$lib/components/Watchlist/Watchlist.svelte";
    import PageTitle from "$lib/components/Layout/PageTitle.svelte";
    import Summary from "$lib/components/Watchlist/_Summary.svelte";

    const TITLE = "Watchlist";
</script>

<div class="modulePool">
    <PageTitle title={TITLE} />
    <Summary />
    <Graph />
    <Watchlist />
</div>

<style lang="scss">
    .modulePool {
        width: 100%;
    }
</style>
