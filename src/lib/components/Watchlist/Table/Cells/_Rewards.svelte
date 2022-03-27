<script lang="ts">
    import Format from "$lib/helpers/format";
    import { marketPrices } from "$lib/stores/marketPrices";

    export let node;
</script>

<td>
    <div>
        {node.rewardsInData}
        <!-- ({Format.twoDecimals(node.rewardsInData * $marketPrices.DATAUSDT)}) -->
    </div>
</td>

<style lang="scss">
    div {
        text-align: center;
        width: 100%;
    }
</style>
