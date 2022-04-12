<script lang="ts">
    import Navigation from "./_Navigation.svelte";
    import Connect from "./_Connect.svelte";
    import DockUser from "./_DockUser.svelte";
    import { userData } from "$lib/stores/userData";
    import { brubeckData } from "$lib/stores/brubeckData";
</script>

<header class="container">
    <div class="row">
        <div class="logo">
            <h1>BrubeckScan</h1>
            <div class="apy">{$brubeckData.apy["24h-APY"]}<span class="text">%</span> APY</div>
        </div>
        <div>
            {#if !$userData}
                <Connect />
            {:else}
                <DockUser />
            {/if}
        </div>
    </div>
    <div class="row">
        <Navigation />
    </div>
</header>

<style lang="scss">
    header {
        background-color: var(--color-black);
    }
    .text {
        color: var(--color-orange);
    }
    .apy {
        padding: 7px;
        border: 1px solid lightgray;
        font-size: 12px;
    }
    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    .container {
        position: sticky;
        top: 0;
        width: 100%;
        flex-direction: column;
        align-items: center;
        display: flex;
        z-index: 2;
        max-width: 1300px;
    }
    .row {
        display: flex;
        width: 100%;
        max-width: var(--site-max-width);
        justify-content: space-between;
        align-items: center;
        padding: 10px 0px;
        height: 75px;
        @media (max-width: 1400px) {
            max-width: 100%;
            padding: 20px;
        }
    }

    h1 {
        font-weight: 800;
        font-size: 20px;
    }
</style>
