<script lang="ts">
    import { browser } from "$app/env";
    import { onMount } from "svelte";
    import Chart from "chart.js/auto/auto.js";
    import { brubeckDataHistorySets } from "$lib/stores/brubeckData";
    import Data from "$lib/components/HTMLElements/Logos/_Data.svelte";

    const GRAPH_ID = "totalDataStakedHistory";

    function generateGraphConfig() {
        const data = {
            labels: $brubeckDataHistorySets.labels,
            datasets: [
                {
                    label: "Total DATA Staked",
                    backgroundColor: "black",
                    borderColor: "lightblue",
                    borderWidth: 1,
                    data: $brubeckDataHistorySets.totalDataStaked,
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
    <h3>Total staked DATA <Data/></h3>
    <canvas id={GRAPH_ID} />
</div>

<style lang="scss">
    .module {
        width: 100%;
    }

    h3 {
        display: flex;
        align-items: center;
        gap: 10px;
    }
</style>