<script lang="ts">
    import { onMount } from "svelte";
    import { brubeckData } from "$lib/stores/brubeckData";

    let apyPercentage = 0;

    onMount(async () => {
        setInterval(function () {
            if (apyPercentage <= $brubeckData.apy["24h-APY"]) {
                apyPercentage++;
            }
        }, 20);
    });
</script>

<div class="module">
    <div class="text">{apyPercentage} <span>%</span> APY</div>
</div>

<style lang="scss">
    .module {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        span {
            color: var(--color-orange);
        }
        .text {
            font-size: 36px;
        }
    }
</style>
