<script lang="ts">
    import { fade } from "svelte/transition";
    import { goto } from "$app/navigation";
    import { send } from "$lib/helpers/send";
    import { browser } from "$app/env";
    import { session } from "$app/stores";
    import UserService from "$lib/services/user";
    import { brubeckData } from "$lib/stores/brubeckData";
    import { userData, userDataComputed } from "$lib/stores/userData";
    import { scannedNodeData } from "$lib/stores/scannedNodeData";
    import "../../static/styles/reset.scss";
    import "../../static/styles/style.scss";
    import Dock from "$lib/modules/Layout/Dock/Dock.svelte";

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
                        const data = await UserService.getNodesData(user.nodes);
                        if (data) {
                            $userDataComputed = data;
                            $scannedNodeData = data.find(node => node.address === user.address);
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
                        const data = await UserService.getNodesData(user.nodes);
                        if (data) {
                            $userDataComputed = data;
                            $scannedNodeData = data.find(node => node.address === user.address);
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
        <div in:fade class="sticky">
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
</style>
