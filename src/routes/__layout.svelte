<script lang="ts">
    import UserService from "$lib/services/user";
    import { fade } from "svelte/transition";
    import { send } from "$lib/helpers/send";
    import Dock from "$lib/modules/Layout/Dock/Dock.svelte";
    import { browser } from "$app/env";
    import { session } from "$app/stores";
    import { brubeckData } from "$lib/stores/brubeckData";
    import { userData, userDataComputed } from "$lib/stores/userData";
    import { scannedNodeData } from "$lib/stores/scannedNodeData";
    import { goto } from "$app/navigation";
    import "../../static/styles/reset.scss";
    import "../../static/styles/style.scss";

    async function getNodesData(nodes: any) {
        const requests = nodes.map((node) => {
            return send("GET", `brubeck/node/${node.address}.json`);
        });

        const responses = await Promise.all(requests);

        const data = await Promise.all(
            responses.map((response) => response.json())
        );

        return data;
    }

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
                    $userData = user;

                    // Get nodes infos in bundling step for a smoother experience
                    if (user) {
                        const data = await getNodesData(user.nodes);
                        if (data) {
                            $userDataComputed = data;
                            $scannedNodeData = data[0];
                        }
                    }
                }
            }

            window.ethereum.on("disconnect", function (error) {
                $session.user = null;
                $userData = null;
                $userDataComputed = null;
                $scannedNodeData = null;
                goto("/");
            });

            window.ethereum.on("accountsChanged", async function (accounts) {
                if (accounts.length > 0) {
                    const user = await UserService.upsert(accounts[0]);
                    $session.user = user;
                    $userData = user;
                    // Get nodes infos in bundling step for a smoother experience
                    if (user) {
                        const data = await getNodesData(user.nodes);
                        if (data) {
                            $userDataComputed = data;
                            $scannedNodeData = data[0];
                        }
                    }
                } else {
                    $session.user = null;
                    $userData = null;
                    $userDataComputed = null;
                    $scannedNodeData = null;
                    goto("/");
                }
            });
        }
    }

    const promise = bundle();
</script>

<main>
    {#await promise}
        <div class="loading">
            <div class="module">
                <h2>Loading</h2>
            </div>
        </div>
    {:then}
        <div in:fade>
            <Dock />
        </div>
        <div class="page" in:fade>
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
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
