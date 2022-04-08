<script context="module" lang="ts">
</script>

<script lang="ts">
    import Graph from "$lib/components/Watchlist/_Graph.svelte";
    import Watchlist from "$lib/components/Watchlist/Watchlist.svelte";
    import Summary from "$lib/components/Watchlist/_Summary.svelte";
    import ApyApr from "$lib/components/Brubeck/ApyApr.svelte";
    import { watchListSummary } from "$lib/stores/userData";
    import { watchlistTab } from "$lib/stores/selectedTabs";
</script>

<div class="modulePool">
    <div class="module selector">
        <div
            class="tab {$watchlistTab === 'overview' ? 'active' : ''}"
            on:click={() => ($watchlistTab = "overview")}
        >
            Overview
        </div>
        <div
            class="tab {$watchlistTab === 'watchlist' ? 'active' : ''}"
            on:click={() => ($watchlistTab = "watchlist")}
        >
            Nodes ({$watchListSummary.count})
        </div>
    </div>
    {#if $watchlistTab === "watchlist"}
        <Watchlist />
    {/if}

    {#if $watchlistTab === "overview"}
        <Graph />
        <Summary />
        <ApyApr />
    {/if}
</div>

<style lang="scss">
    .modulePool {
        width: 100%;
        gap: 0;
    }

    .module {
        width: 100%;
        flex-direction: row;
        font-size: 22px;
    }

    .selector {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .tab {
        font-size: 22px;
        color: rgb(95, 95, 95);
        transition-duration: 0.1s;
        padding-bottom: 20px;
        border-bottom: 5px solid transparent;
        &.active {
            color: whitesmoke;
            border-bottom: 5px solid whitesmoke;
        }
        &:hover {
            color: whitesmoke;
            cursor: pointer;
        }
    }
</style>
