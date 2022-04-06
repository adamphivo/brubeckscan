<script lang="ts">
    import Format from "$lib/helpers/format";
    export let node;
</script>

<td>
    <div>
        <p>{node.claimCount}</p>
        <p>({Format.twoDecimals(node.claimPercentage * 100)} %)</p>
    </div>
</td>

<style lang="scss">    
    td {
        text-align: center;
        position: relative;
    }

    div {
        position:  absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        font-size: 12px;
    }
</style>