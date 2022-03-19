<script lang="ts">
    import { session } from "$app/stores";
    import { browser } from "$app/env";
    import { onMount } from "svelte";
    import Chart from "chart.js/auto/auto.js";

    const GRAPH_ID = "missedClaimsChart";

    function generateGraphConfig() {
        const data = {
            labels: $session.brubeck.lastRewards.map((reward, index) => 100 - index),
            datasets: [
                {
                    label: "missedClaims",
                    backgroundColor: "black",
                    borderColor: "orange",
                    borderWidth: 1,
                    data: $session.brubeck.lastRewards.map(
                        (reward) => reward.topologySize - reward.receivedClaims
                    ),
                },
            ],
        };

        const config: any = {
            type: "line",
            data: data,
            options: {},
        };

        return config;
    }

    onMount(async () => {
        if (browser) {
            const config = generateGraphConfig();
            const element: any = document.getElementById(GRAPH_ID);
            const chart = new Chart(element, config);
        }
    });
</script>

{#if $session.brubeck.lastRewards}
    <div class="module graph">
        <canvas id={GRAPH_ID} />
    </div>
{/if}

<style>
    .module {
        /* width: calc(50% - 15px); */
        width: 100%;
        border: none;
    }
</style>
