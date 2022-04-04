<script lang="ts">
    import Format from "$lib/helpers/format";
    import Consts from "$lib/consts";
    import Tip from "./_Tip.svelte";
    import Socials from "./_Socials.svelte";
    import { hasEthereum, userData } from "$lib/stores/userData";
    let copyText = "Copy";

    function copyAddressToClipboard() {
        navigator.clipboard.writeText(Consts.streamr.TIP_JAR_ADDRESS);
        copyText = "Copied";
        setTimeout(() => (copyText = "Copy"), 2000);
    }
</script>

<footer class="footer">
    <Socials />
    <section>
        <div>
            <p>If you find this app useful, you can get me a coffee ☕</p>
        </div>
        <div class="tipInfo">
            <div class="address">
                ETH : {Format.shortenNodeAddress(
                    Consts.streamr.TIP_JAR_ADDRESS
                )}
            </div>
            <button on:click={copyAddressToClipboard}>{copyText}</button>
            {#if $hasEthereum && $userData}
                <span>or</span>
                <div>
                    <Tip />
                </div>
            {/if}
        </div>
    </section>
</footer>

<style lang="scss">
    footer {
        width: 100%;
        display: flex;
        justify-content: center;
        font-weight: bold;
        flex-direction: column;
        align-items: center;
        margin-top: 100px;
        section {
            width: 100%;
            max-width: var(--site-max-width);
            background-color: rgb(20, 20, 22);
            padding: 10px 30px;
            display: flex;
            gap: 30px;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            @media (max-width: 1400px) {
                flex-direction: column;
                text-align: center;
                line-height: 30px;
            }
            .tipInfo {
                display: flex;
                align-items: center;
                gap: 20px;
                @media (max-width: 1400px) {
                    flex-direction: column;
                }
            }
        }
    }
</style>
