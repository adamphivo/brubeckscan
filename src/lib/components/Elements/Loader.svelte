<script lang="ts">
    import { fade } from "svelte/transition";
    import { loadingStatus } from "$lib/stores/loadingStatus";
    import { BarLoader } from "svelte-loading-spinners";
</script>

<div class="module" in:fade>
    <h1>BrubeckScan</h1>
    <BarLoader />
    <div class="status">{$loadingStatus}</div>
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

        .status {
            font-size: 12px;
        }
    }
</style>
