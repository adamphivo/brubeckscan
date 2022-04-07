<script lang="ts">
    import Tip from "./_Tip.svelte";
    import Socials from "./_Socials.svelte";
    import TiSocialGithub from "svelte-icons/ti/TiSocialGithub.svelte";
    import { hasEthereum } from "$lib/stores/userData";
</script>

<footer class="footer">
    <section>
        <a
            href="https://github.com/adamphivo/brubeckscan"
            target="_blank"
            title="GitHub"
        >
            <div class="icon">
                <TiSocialGithub />
            </div>
        </a>
        <Socials />
        <aside>
            {#if $hasEthereum}
                <div>
                    <Tip />
                </div>
            {:else}
                <a href="https://metamask.io/download/" target="_blank">
                    <button>Get MetaMask</button>
                </a>
            {/if}
        </aside>
    </section>
</footer>

<style lang="scss">
    footer {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin-top: 100px;
        button {
            width: max-content;
        }
        section {
            width: 100%;
            max-width: var(--site-max-width);
            background-color: transparent;
            padding: 30px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            @media (max-width: 1400px) {
                flex-direction: column;
                text-align: center;
                line-height: 30px;
            }
            aside {
                display: flex;
                align-items: center;
                @media (max-width: 1400px) {
                    flex-direction: column;
                }
            }
        }
    }

    .icon {
        width: 30px;
        transition-duration: 0.2s;
        color: gray;
        &:hover {
            color: white;
        }
    }
</style>
