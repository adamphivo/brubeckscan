<script lang="ts">
    import NodeData from "./_NodeData.svelte";
    import NodeDataForm from "./_NodeDataForm.svelte";
</script>

<div class="module">
    <NodeDataForm />
    <NodeData />
</div>

<style lang="scss">
    .module {
        width: 100%;
        gap: 30px;
    }
</style>
