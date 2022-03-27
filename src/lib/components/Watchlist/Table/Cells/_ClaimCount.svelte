<script lang="ts">
    import Format from "$lib/helpers/format";
    export let node;
    console.log(node);
</script>

<td>
    {node.claimCount} ({Format.twoDecimals(node.claimPercentage * 100)} %)
</td>

<style lang="scss">    
    td {
        text-align: center;
    }
</style>