<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/env";
    import Chart from "chart.js/auto/auto.js";
    import { userDataSets } from "$lib/stores/userData";

    const GRAPH_ID = "userTotalData";

    function generateGraphConfig() {
        const data = {
            labels: $userDataSets.labels,
            datasets: [
                {
                    label: "Total Accumulated Rewards in DATA",
                    backgroundColor: "rgb(44, 41, 41)",
                    borderColor: "lightgreen",
                    borderWidth: 1,
                    data: $userDataSets.rewardsInData,
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

{#if $userDataSets}
    <div class="module graph">
        <canvas id={GRAPH_ID} />
    </div>
{/if}

<style lang="scss">
    .module {
        flex-grow: 1;
    }
</style>
