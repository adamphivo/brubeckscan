<script context="module">
    export async function load({ fetch, session }) {
        const response = await fetch("http://localhost:3000/api", {
            method: "GET",
            headers: { internal_token: `${import.meta.env.VITE_AUTH_TOKEN}` },
        });

        const data = await response.json();

        if (data) {
            session.prices = data.prices;
            session.brubeck = data.brubeck;
        }

        return {};
    }
</script>

<script lang="ts">
    import api from "$lib/helpers/api";
    import Dock from "$lib/components/layout/Dock/Dock.svelte";
    import { browser } from "$app/env";
    import { onMount } from "svelte";
    import { session } from "$app/stores";
    import { goto } from "$app/navigation";
    import "../../static/styles/reset.scss";
    import "../../static/styles/style.scss";

    onMount(async () => {
        if (browser) {
            if (window.ethereum) {
                if (window.ethereum.selectedAddress) {
                    const sync = await api.syncUser(
                        window.ethereum.selectedAddress
                    );
                }
            }

            window.ethereum.on("disconnect", function (error) {
                $session.user = null;
                goto("/");
            });

            window.ethereum.on("accountsChanged", async function (accounts) {
                if (accounts.length > 0) {
                    const sync = await api.syncUser(accounts[0]);
                } else {
                    $session.user = null;
                    goto("/");
                }
            });
        }
    });
</script>

<main>
    <Dock />
    <div class="page">
        <slot />
    </div>
</main>

<style>
    :global(*) {
        font-family: "Space Mono", monospace;
    }
    main {
        min-height: 120vh;
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
    }
</style>
