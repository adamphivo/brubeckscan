<script lang="ts">
    import { browser } from "$app/env";
    import { onMount } from "svelte";
    import Chart from "chart.js/auto/auto.js";
    import { brubeckDataHistorySets } from "$lib/stores/brubeckData";

    const GRAPH_ID = "apyHistory";

    function generateGraphConfig() {
        const data = {
            labels: $brubeckDataHistorySets.labels,
            datasets: [
                {
                    label: "24h APY %",
                    backgroundColor: "rgb(44, 41, 41)",
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

<div class="module graph">
    <canvas id={GRAPH_ID} />
</div>

<style lang="scss">
    .module {
        width: 100%;
    }
</style>