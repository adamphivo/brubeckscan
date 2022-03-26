<script lang="ts">
    import Tip from "./_Tip.svelte";
    import { hasEthereum } from "$lib/stores/userData";
</script>

<footer class="footer">
    <section>
        <div>
            <p>If you enjoy this app, you can get me a coffee ☕</p>
        </div>
        <div>ETH : 0x2BC4019cbA9d02927c9Be04D5cD5D055FC222581</div>
        {#if $hasEthereum}
            <div>
                <Tip />
            </div>
        {/if}
    </section>
</footer>

<style lang="scss">
    footer {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 30px;
        font-weight: bold;
        section {
            width: 100%;
            max-width: var(--site-max-width);
            background-color: black;
            padding: 20px;
            display: flex;
            gap: 30px;
            justify-content: center;
            align-items: center;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }
    }
</style>
