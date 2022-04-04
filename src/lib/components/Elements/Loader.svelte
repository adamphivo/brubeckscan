<script lang="ts">
    import { BarLoader } from "svelte-loading-spinners";
</script>

<div class="module">
    <h1>BrubeckScan</h1>
    <BarLoader />
</div>

<style lang="scss">
    .module {
        font-size: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        h1 {
            font-size: 30px;
            font-weight: 600;
        }
    }
</style>
