<script lang="ts">
    import UserService from "$lib/services/user";
    import { send } from "$lib/helpers/send";
    import Dock from "$lib/components/layout/Dock/Dock.svelte";
    import { browser } from "$app/env";
    import { session } from "$app/stores";
    import { brubeckData } from "$lib/stores/brubeckData";
    import { goto } from "$app/navigation";
    import "../../static/styles/reset.scss";
    import "../../static/styles/style.scss";

    async function bundle() {
        if (browser) {
            const marketPrices = await send("GET", "market/prices.json").then(
                (r) => r.json()
            );

            const brubeckStats = await send("GET", "brubeck/stats.json").then(
                (r) => r.json()
            );

            $brubeckData = brubeckStats;

            $session.prices = marketPrices;

            if (window.ethereum) {
                if (window.ethereum.selectedAddress) {
                    const user = await UserService.upsert(
                        window.ethereum.selectedAddress
                    );

                    $session.user = user;
                }
            }

            window.ethereum.on("disconnect", function (error) {
                $session.user = null;
                goto("/");
            });

            window.ethereum.on("accountsChanged", async function (accounts) {
                if (accounts.length > 0) {
                    const user = await UserService.upsert(accounts[0]);
                    $session.user = user;
                } else {
                    $session.user = null;
                    goto("/");
                }
            });
        }
    }

    const promise = bundle();
</script>

<main>
    {#await promise}
        <div class="loading page">
            <div class="module">
                <h2>Loading</h2>
            </div>
        </div>
    {:then}
    <Dock />
        <div class="page">
            <slot />
        </div>
    {/await}
</main>

<style>
    :global(*) {
        font-family: "Space Mono", monospace;
    }
    main {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .page {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-grow: 1;
        width: 100%;
        padding: 30px 0;
        min-height: 120vh;
    }

    .loading {
        width: 100%;
    }

    .page.loading {
        min-height: 100vh;
    }

    .page.loading {
        justify-content: center;
        align-items: center;
    }
</style>
