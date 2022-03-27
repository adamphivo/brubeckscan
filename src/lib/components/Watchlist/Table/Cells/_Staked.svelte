<script lang="ts">
    import Format from "$lib/helpers/format";
    import { marketPrices } from "$lib/stores/marketPrices";

    export let node;

    let isWarning = node.dataStaked > 10000 || node.dataStaked === 0;
</script>

<td>
    <div class:isWarning>
        <div>
            {Format.tokenValue(node.dataStaked)}
        </div>
        <!-- <div>
            ({Format.twoDecimals(node.dataStaked * $marketPrices.DATAUSDT)} USDT)
        </div> -->
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
</style>
