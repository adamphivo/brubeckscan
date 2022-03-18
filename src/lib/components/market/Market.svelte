<script lang="ts">
    import { session } from "$app/stores";
</script>

<div class="container">
    {#each $session.prices as price}
        <div class="price">
            <div class="symbol">{price.symbol}</div>
            <div class="value">{price.price}</div>
        </div>
    {/each}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        padding: 30px;
        border:1px solid rgb(231, 231, 231);
        justify-content: center;
        border-radius: 5px;
        gap: 10px;
        background-color: rgba(0, 0, 0, 0.322);
    }

    .price {
        display: flex;
        gap: 30px;
        justify-content: space-between;
    }
</style>
