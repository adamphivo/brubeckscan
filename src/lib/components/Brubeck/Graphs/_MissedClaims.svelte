<script lang="ts">
    import { browser } from "$app/env";
    import { onMount } from "svelte";
    import { brubeckDataDerived } from "$lib/stores/brubeckData";
    import Chart from "chart.js/auto/auto.js";

    const GRAPH_ID = "missedClaimsChart";

    function generateGraphConfig() {
        const data = {
            labels: $brubeckDataDerived.codes,
            datasets: [
                {
                    label: "missedClaims",
                    backgroundColor: "rgb(44, 41, 41)",
                    borderColor: "orange",
                    borderWidth: 1,
                    data: $brubeckDataDerived.missedClaims,
                },
            ],
        };

        const config: any = {
            type: "line",
            data: data,
            options: {
                scales: {
                    x: {
                        ticks: {
                            display: false,
                        },
                    },
                },
            },
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

{#if $brubeckDataDerived}
    <div class="module graph">
        <h3>Missed claims</h3>
        <h4>Number of nodes that did not successfully claimed the reward code</h4>
        <canvas id={GRAPH_ID} />
    </div>
{/if}

<style>
    .module {
        width: 100%;
    }
</style>
