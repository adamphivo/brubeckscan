<script lang="ts">
    import { session } from "$app/stores";
    import Usdt from "$lib/modules/Components/Logos/_Tether.svelte";
    import Data from "$lib/modules/Components/Logos/_Data.svelte";
    import Btc from "$lib/modules/Components/Logos/_Bitcoin.svelte";
</script>

{#if $session.prices}
    <div class="module moduleTitle">
        <h3>Markets</h3>
    </div>
    <div class="module">
        {#each Object.entries($session.prices) as [symbol, price]}
            <div class="price">
                {#if symbol === "BTCUSDT"}
                    <div class="symbol"><Btc />{symbol.replace('USDT', '')}</div>
                    <div class="value">{price} USDT<Usdt /></div>
                {/if}
                {#if symbol === "DATAUSDT"}
                    <div class="symbol"><Data />{symbol.replace('USDT', '')}</div>
                    <div class="value">{price} USDT<Usdt /></div>
                {/if}
            </div>
        {/each}
    </div>
{/if}

<style>
    .price {
        display: flex;
        gap: 30px;
        justify-content: space-between;
        align-items: center;
    }
    .module {
        flex-grow: 1;
        width: 100%;
        gap: 30px;
    }

    .value {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: bold;
    }

    .symbol {
        display: flex;
        align-items: center;
        gap: 20px;
        font-size: 18px;
    }
</style>
