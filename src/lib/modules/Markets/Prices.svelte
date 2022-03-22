<script lang="ts">
    import { marketPrices } from "$lib/stores/marketPrices";
    import Usdt from "$lib/modules/Components/Logos/_Tether.svelte";
    import Data from "$lib/modules/Components/Logos/_Data.svelte";
    import Btc from "$lib/modules/Components/Logos/_Bitcoin.svelte";
</script>

{#if $marketPrices}
    <div class="module moduleTitle">
        <h3>Markets</h3>
    </div>
    <div class="module">
        {#each Object.entries($marketPrices) as [symbol, price]}
            <div class="data">
                {#if symbol === "BTCUSDT"}
                    <div class="label"><Btc />{symbol.replace('USDT', '')}</div>
                    <div class="value">{price} USDT<Usdt /></div>
                {/if}
                {#if symbol === "DATAUSDT"}
                    <div class="label"><Data />{symbol.replace('USDT', '')}</div>
                    <div class="value">{price} USDT<Usdt /></div>
                {/if}
            </div>
        {/each}
    </div>
{/if}

<style>
    .module {
        width: 100%;
    }
</style>
