<script lang="ts">
    import Format from "$lib/helpers/format";
    import { marketPrices } from "$lib/stores/marketPrices";
    import { selectedNodesCurrency } from "$lib/stores/selectedCurrency";

    export let node;

    let isWarning = node.dataStaked > 10000 || node.dataStaked === 0;
</script>

<td>
    <div class:isWarning>
        {#if $selectedNodesCurrency === "data"}
            <div class="dataC">
                {Format.tokenValue(node.dataStaked)}
            </div>
        {:else if $selectedNodesCurrency === "usdt"}
            <div class="usdt">
                {Format.twoDecimals(node.dataStaked * $marketPrices.DATAUSDT)}
            </div>
        {/if}
    </div>
</td>

<style lang="scss">
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        width: 100%;
        &.isWarning {
            color: rgb(199, 199, 67);
        }
    }

    .dataC {
        color: var(--color-orange);
    }

    .usdt {
        color: rgb(100, 218, 161);
    }
</style>
