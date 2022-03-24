<script lang="ts">
    import { browser } from "$app/env";
    import { onMount } from "svelte";
    import Chart from "chart.js/auto/auto.js";
    import { brubeckDataHistorySets } from "$lib/stores/brubeckData";
    console.log($brubeckDataHistorySets);

    const GRAPH_ID = "apyHistory";

    function generateGraphConfig() {
        const data = {
            labels: $brubeckDataHistorySets.labels,
            datasets: [
                {
                    label: "24h APY %",
                    backgroundColor: "black",
                    borderColor: "lightblue",
                    borderWidth: 1,
                    data: $brubeckDataHistorySets.apys,
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

<div class="module moduleTitle">
    <h3>24H APY History</h3>
</div>
<div class="module graph">
    <canvas id={GRAPH_ID} />
</div>

<style lang="scss">
    .module {
        width: 100%;
    }
</style>