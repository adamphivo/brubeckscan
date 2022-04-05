<script lang="ts">
    import { brubeckDataDerived } from "$lib/stores/brubeckData";
    import { browser } from "$app/env";
    import { onMount } from "svelte";
    import Chart from "chart.js/auto/auto.js";

    const GRAPH_ID = "topologyChart";

    function generateGraphConfig() {
        const data = {
            labels: $brubeckDataDerived.codes,
            datasets: [
                {
                    label: "topologySize",
                    backgroundColor: "rgb(44, 41, 41)",
                    borderColor: "lightgrey",
                    borderWidth: 1,
                    data: $brubeckDataDerived.topologySizes,
                },
                {
                    label: "receivedClaims",
                    backgroundColor: "rgb(44, 41, 41)",
                    borderColor: "lightgreen",
                    borderWidth: 1,
                    data: $brubeckDataDerived.receivedClaims,
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
        <h3>Network topology</h3>
        <h4>Total number of nodes & number of received claims for each reward code</h4>
        <canvas id={GRAPH_ID} />
    </div>
{/if}

<style>
    .module {
        width: 100%;
    }
</style>
