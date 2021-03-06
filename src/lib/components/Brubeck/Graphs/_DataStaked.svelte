<script lang="ts">
  import { browser } from "$app/env";
  import { onMount } from "svelte";
  import Chart from "chart.js/auto/auto.js";
  import { brubeckData, brubeckDataHistorySets } from "$lib/stores/brubeckData";
  import { marketPrices } from "$lib/stores/marketPrices";
  import Format from "$lib/helpers/format";

  const GRAPH_ID = "totalDataStakedHistory";

  function generateGraphConfig() {
    const data = {
      labels: $brubeckDataHistorySets.labels,
      datasets: [
        {
          backgroundColor: "rgb(44, 41, 41, 0.2)",
          borderColor: "#F65F0A",
          borderWidth: 1,
          fill: true,
          data: $brubeckDataHistorySets.totalDataStaked,
          pointRadius: 0.5,
        },
      ],
    };

    const config: any = {
      type: "line",
      data: data,
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
          y: {
            ticks: {
              display: false,
              drawBorder: false
            },
            grid: {
              display: false,
              drawBorder: false
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
  <h3>TVL<span class="subTitle">( Total Value Locked )</span></h3>
  <h4 class="tvl">
    <span class="USDT"
      >{Format.tokenValue(
        $brubeckData.apy["24h-data-staked"] * $marketPrices.DATAUSDT
      )} USDT</span
    >
    <span>/</span>
    <span class="DATA"
      >{Format.tokenValue($brubeckData.apy["24h-data-staked"])} DATA</span
    >
  </h4>
  <canvas id={GRAPH_ID} />
</div>

<style lang="scss">
  .module {
    width: 50%;
  }

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 24px;
  }

  .DATA {
    color: var(--color-orange);
  }

  .USDT {
    color: rgb(100, 218, 161);
  }

  .subTitle {
    color: rgb(145, 138, 138);
    font-size: 16px;
  }

  .tvl {
    font-size: 22px;
  }

  @media (max-width: 1200px) {
    .module {
      width: 100%;
    }

    h3 {
      font-size: 16px;
    }

    .subTitle {
      font-size: 16px;
    }
  }
</style>
