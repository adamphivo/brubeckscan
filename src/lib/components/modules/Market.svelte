<script lang="ts">
    import { session } from "$app/stores";
</script>

{#if $session.prices}
    <div class="module">
        {#each $session.prices as price}
            <div class="price">
                <div class="symbol">{price.symbol}</div>
                <div class="value">{price.price}</div>
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
