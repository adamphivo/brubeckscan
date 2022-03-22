<script lang="ts">
    import { browser } from "$app/env";
    import { onMount } from "svelte";
    import { brubeckDataDerived } from "$lib/stores/brubeckData";
    import Chart from "chart.js/auto/auto.js";

    const GRAPH_ID = "meanPropagationDelaysChart";

    function generateGraphConfig() {
        const data = {
            labels: $brubeckDataDerived.codes,
            datasets: [
                {
                    label: "meanPropagationDelay",
                    backgroundColor: "black",
                    borderColor: "lightblue",
                    borderWidth: 1,
                    data: $brubeckDataDerived.meanPropagationDelays,
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
        <h3>Mean propagation delays</h3>
    </div>
    <div class="module graph">
        <canvas id={GRAPH_ID} />
    </div>
{/if}

<style>
    .module {
        width: 100%;
    }
</style>
