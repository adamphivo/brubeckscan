<script lang="ts">
    import { marketPrices } from "$lib/stores/marketPrices";
    import Format from "$lib/helpers/format";
    import Usdt from "$lib/components/HTMLElements/Logos/_Tether.svelte";
    import Data from "$lib/components/HTMLElements/Logos/_Data.svelte";
    import Btc from "$lib/components/HTMLElements/Logos/_Bitcoin.svelte";
</script>

{#if $marketPrices}
    <div class="module">
        {#each Object.entries($marketPrices) as [symbol, price], index}
            {#if index === 1}
                <div class="separator" />
            {/if}
            <div class="data">
                {#if symbol === "BTCUSDT"}
                    <div class="label"><Btc />{symbol.replace("USDT", "")}</div>
                    <div class="value">
                        {Format.tokenValue(price)} USDT<Usdt />
                    </div>
                {/if}
                {#if symbol === "DATAUSDT"}
                    <div class="label">
                        <Data />{symbol.replace("USDT", "")}
                    </div>
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
