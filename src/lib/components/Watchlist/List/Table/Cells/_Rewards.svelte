<script lang="ts">
    import Format from "$lib/helpers/format";
    import { selectedNodesCurrency } from "$lib/stores/selectedCurrency";
    import { marketPrices } from "$lib/stores/marketPrices";

    export let node;
</script>

<td>
    <div>
        {#if $selectedNodesCurrency === "data"}
            <p class="dataC">{node.rewardsInData}</p>
        {:else if $selectedNodesCurrency === "usdt"}
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
        color: var(--color-orange);
    }

    .usdt {
        color: rgb(100, 218, 161);
    }
</style>
