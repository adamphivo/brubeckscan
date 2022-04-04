<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/env";
    import Chart from "chart.js/auto/auto.js";
    import { watchListSummary } from "$lib/stores/userData";
    import { userDataSets } from "$lib/stores/userData";

    const GRAPH_ID = "userTotalData";

    function generateGraphConfig() {
        const data = {
            labels: $userDataSets.labels,
            datasets: [
                {
                    label: "Total Accumulated Rewards in DATA",
                    backgroundColor: "rgb(44, 41, 41)",
                    borderColor: "#F65F0A",
                    borderWidth: 1,
                    data: $userDataSets.rewardsInData,
                    pointRadius: 0,
                    fill: true,
                },
            ],
        };

        const config: any = {
            type: "line",
            data: data,
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            display: false,
                        },
                        grid: {
                            display: false,
                        }
                    },
                    y: {
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false
                        }
                    }
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
        <h3>Total Accumulated Rewards</h3>
        <h4>{$watchListSummary.totalRewardsInData} <span>DATA</span></h4>
        <canvas id={GRAPH_ID} />
    </div>
{/if}

<style lang="scss">
    .module {
        flex-grow: 1;
    }

    h4 {
        font-size: 22px;
    }

    h4 span {
        color: var(--color-orange);
    }
</style>
