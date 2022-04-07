<script lang="ts">
    import Format from "$lib/helpers/format";
    import { selectedCurrency } from "$lib/stores/selectedCurrency";
    import { marketPrices } from "$lib/stores/marketPrices";

    export let node;
</script>

<td>
    <div>
        {#if $selectedCurrency === "data"}
            <p class="dataC">{node.rewardsInData}</p>
        {:else if $selectedCurrency === "usdt"}
            <p class="usdt">
                {Format.twoDecimals(
                    node.rewardsInData * $marketPrices.DATAUSDT
                )}
            </p>
        {/if}
    </div>
</td>

<style lang="scss">
    div {
        text-align: center;
        width: 100%;
    }

    p {
        text-align: center;
    }

    .dataC {
        color: rgb(167, 112, 99);
    }

    .usdt {
        color: rgb(100, 218, 161);
    }
</style>
