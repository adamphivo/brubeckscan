<script context="module" lang="ts">
</script>

<script lang="ts">
    import Graph from "$lib/components/Watchlist/_Graph.svelte";
    import Watchlist from "$lib/components/Watchlist/Watchlist.svelte";
    import Summary from "$lib/components/Watchlist/_Summary.svelte";
    import { watchListSummary } from "$lib/stores/userData";

    let selectedPage = "overview";
</script>

<div class="modulePool">
    <div class="module selector">
        <div
            class="tab {selectedPage === 'overview' ? 'active' : ''}"
            on:click={() => (selectedPage = "overview")}
        >
            Overview
        </div>
        <div>/</div>
        <div
            class="tab {selectedPage === 'watchlist' ? 'active' : ''}"
            on:click={() => (selectedPage = "watchlist")}
        >
            Nodes ({$watchListSummary.count})
        </div>
    </div>
    {#if selectedPage === "watchlist"}
        <Watchlist />
    {/if}

    {#if selectedPage === "overview"}
        <Graph />
        <Summary />
    {/if}
</div>

<style lang="scss">
    .modulePool {
        width: 100%;
        gap: 0;
        padding-top: 50px;
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
