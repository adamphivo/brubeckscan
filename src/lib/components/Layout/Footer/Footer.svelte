<script lang="ts">
    import Tip from "./_Tip.svelte";
    import Socials from "./_Socials.svelte";
    import TiSocialGithub from 'svelte-icons/ti/TiSocialGithub.svelte'
    import { hasEthereum, userData } from "$lib/stores/userData";
</script>

<footer class="footer">
    <Socials />
    <section>
        <a href="https://github.com/adamphivo/brubeckscan" target="_blank" title="GitHub">
            <div class="icon">
                <TiSocialGithub />
            </div>
        </a>
        <div class="tipInfo">
            {#if $hasEthereum}
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
            background-color: rgb(0, 0, 0);
            padding: 20px 30px;
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
    .icon {
        padding: 5px;
        width: 40px;
        transition-duration: 0.2s;
        color: gray;
        &:hover {
            color: white;
        }
    }
</style>
