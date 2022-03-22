<script lang="ts">
    import { brubeckData } from "$lib/stores/brubeckData"
</script>

<div class="module">
    <div class="label">Latest reward code</div>
    <div class="value">{$brubeckData.lastCode}</div>
</div>

<style lang="scss">
    .module {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
</style>