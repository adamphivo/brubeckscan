<script lang="ts">
    import { selectedCurrency } from "$lib/stores/selectedCurrency";
    import Data from "$lib/components/Branding/Logos/_Data.svelte";
    import Usdt from "$lib/components/Branding/Logos/_Tether.svelte";
</script>

<div class="module">
    <div class="buttonContainer">
        <div
            on:click={() => ($selectedCurrency = "data")}
            class="icon {$selectedCurrency === "data" ? "active" : ""}"
        >
            <Data />
        </div>
        <div
            on:click={() => ($selectedCurrency = "usdt")}
            class="icon {$selectedCurrency === "usdt" ? "active" : ""}"
        >
            <Usdt />
        </div>
    </div>
</div>

<style lang="scss">
    .module {
        width: 100%;
        border-radius: 0;
        padding-top: 0px;
        .buttonContainer {
            display: flex;
            flex-direction: row;
            align-items: stretch;
            gap: 10px;
        }
    }

    .icon {
        padding: 10px;
        border-bottom: 5px solid transparent;
        &:hover {
            cursor: pointer;
        }
    }
    .active {
        border-bottom: 5px solid whitesmoke;
    }
</style>
