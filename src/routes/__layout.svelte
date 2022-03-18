<script context="module" lang="ts">
    import { browser } from "$app/env";
    import { session } from "$app/stores";
    import { onMount } from "svelte";
    import "../../static/styles/reset.scss";
    import "../../static/styles/style.scss";

    export const ssr = false;

    export async function load({ params, fetch, session, stuff }) {
        const BINANCE_BASE =
            "https://api.binance.com/api/v3/ticker/price?symbol=";

        const symbols = ["DATAUSDT", "BTCUSDT", "ETHUSDT"];

        const requests = symbols.map(async (symbol) => {
            return await fetch(`${BINANCE_BASE}${symbol}`);
        });

        const responses = await Promise.all(requests);

        const jsons = await Promise.all(responses.map((res) => res.json()));

        session.prices = jsons;

        return {};
    }
</script>

<script lang="ts">
    import Dock from "$lib/components/layout/Dock.svelte";

    onMount(async () => {
        if (browser) {
            if (window.ethereum) {
                if (window.ethereum.selectedAddress) {
                    const init = {
                        method: "GET",
                        headers: {
                            internal_token: `${
                                import.meta.env.VITE_AUTH_TOKEN
                            }`,
                        },
                    };

                    const response = await fetch(
                        `/api/user/${window.ethereum.selectedAddress}.json`,
                        init
                    );

                    const json = await response.json();

                    if (response.ok) {
                        $session.user = json.data.user;
                    }
                }
            }
            // Web3 events
            window.ethereum.on("disconnect", function (error) {
                $session.selectedAddress = null;
                $session.user = null;
            });

            window.ethereum.on("accountsChanged", async function (accounts) {
                if (accounts.length > 0) {
                    $session.selectedAddress = accounts[0];
                    const init = {
                        method: "GET",
                        headers: {
                            internal_token: `${
                                import.meta.env.VITE_AUTH_TOKEN
                            }`,
                        },
                    };

                    const response = await fetch(
                        `/api/user/${$session.selectedAddress}.json`,
                        init
                    );

                    const json = await response.json();

                    if (response.ok) {
                        $session.user = json.data.user;
                    }
                } else {
                    $session.selectedAddress = null;
                    $session.user = null;
                }
            });
        }
    });
</script>

<main>
    <Dock />
    {#if $session.user}
        <div
            style:background={$session?.user?.profile?.gradient || "grey"}
            class="bar"
        />
    {:else}
        <div class="bar nouser" />
    {/if}
    <div class="mainContent">
        <slot />
    </div>
    <div class="footer">
        <p />
    </div>
</main>

<style>
    main {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    :global(*) {
        font-family: "Space Mono", monospace;
    }

    .bar {
        width: 100%;
        height: 3px;
        transition-duration: 0.3s;
        margin-bottom: 30px;
    }

    .nouser {
        background: rgba(36, 34, 34, 0.466);
    }

    .mainContent {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-grow: 1;
    }

    .footer {
        height: 20px;
        background-color: rgb(0, 0, 0);
        width: 100%;
        border-bottom: 5px solid rgb(8, 8, 8);
    }
</style>
