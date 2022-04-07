<script lang="ts">
    import { selectedCurrency } from "$lib/stores/selectedCurrency";
</script>

<div class="module">
    <div class="buttonContainer">
        <div
            on:click={() => ($selectedCurrency = "data")}
            class="dataC {$selectedCurrency === 'data' ? 'active' : ''}"
        >
            <button>Data</button>
        </div>
        <div
            on:click={() => ($selectedCurrency = "usdt")}
            class="usdt {$selectedCurrency === 'usdt' ? 'active' : ''}"
        >
            <button>Usdt</button>
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
