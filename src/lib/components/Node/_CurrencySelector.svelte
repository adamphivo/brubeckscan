<script lang="ts">
    import { selectedScanCurrency } from "$lib/stores/selectedCurrency";
</script>

<div class="module">
    <div class="buttonContainer">
        <div
            on:click={() => ($selectedScanCurrency = "data")}
            class="dataC {$selectedScanCurrency === 'data' ? 'active' : ''}"
        >
            <button>DATA</button>
        </div>
        <div
            on:click={() => ($selectedScanCurrency = "usdt")}
            class="usdt {$selectedScanCurrency === 'usdt' ? 'active' : ''}"
        >
            <button>USDT</button>
        </div>
    </div>
</div>

<style lang="scss">
    .module {
        width: 100%;
        border-radius: 0;
        padding: 0;
        background-color: transparent;
        .buttonContainer {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            gap: 10px;
        }
    }

    .active.usdt {
        button {
            color: rgb(100, 218, 161);
        }
    }

    .active.dataC {
        button {
            color: var(--color-orange);
        }
    }
</style>