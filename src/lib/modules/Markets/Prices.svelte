<script lang="ts">
    import { session } from "$app/stores";
</script>

{#if $session.prices}
    <div class="module">
        {#each Object.entries($session.prices) as [symbol, price]}
            <div class="price">
                <div class="symbol">{symbol}</div>
                <div class="value">{price}</div>
            </div>
        {/each}
    </div>
{/if}

<style>
    .price {
        display: flex;
        gap: 30px;
        justify-content: space-between;
    }
    .module {
        flex-grow: 1;
    }
</style>
