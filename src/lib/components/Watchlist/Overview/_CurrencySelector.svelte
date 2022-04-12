<script lang="ts">
    import { selectedOverviewCurrency } from "$lib/stores/selectedCurrency";
</script>

<div class="module">
    <div class="buttonContainer">
        <div
            on:click={() => ($selectedOverviewCurrency = "data")}
            class="dataC {$selectedOverviewCurrency === 'data' ? 'active' : ''}"
        >
            <button>DATA</button>
        </div>
        <div
            on:click={() => ($selectedOverviewCurrency = "usdt")}
            class="usdt {$selectedOverviewCurrency === 'usdt' ? 'active' : ''}"
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
        margin-bottom: 30px;;
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