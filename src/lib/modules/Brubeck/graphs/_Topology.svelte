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
                    backgroundColor: "black",
                    borderColor: "lightgrey",
                    borderWidth: 1,
                    data: $brubeckDataDerived.topologySizes,
                },
                {
                    label: "receivedClaims",
                    backgroundColor: "black",
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
    <div class="module moduleTitle">
        <h3>Topology</h3>
    </div>
    <div class="module graph">
        <canvas id={GRAPH_ID} />
    </div>
{/if}

<style>
    .module {
        width: 100%;
        border: none;
    }
</style>
