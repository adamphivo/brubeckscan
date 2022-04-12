<script lang="ts">
    import { selectedNodesCurrency } from "$lib/stores/selectedCurrency";
</script>

<div class="module">
    <div class="buttonContainer">
        <div
            on:click={() => ($selectedNodesCurrency = "data")}
            class="dataC {$selectedNodesCurrency === 'data' ? 'active' : ''}"
        >
            <button>DATA</button>
        </div>
        <div
            on:click={() => ($selectedNodesCurrency = "usdt")}
            class="usdt {$selectedNodesCurrency === 'usdt' ? 'active' : ''}"
        >
            <button>USDT</button>
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
