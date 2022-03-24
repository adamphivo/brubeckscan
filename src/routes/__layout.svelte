<script lang="ts">
    import { fade } from "svelte/transition";
    import { goto } from "$app/navigation";
    import { browser } from "$app/env";
    import UserService from "$lib/services/user";
    import StateService from "$lib/services/state";
    import { userData, watchListData } from "$lib/stores/userData";
    import { scannedNodeData } from "$lib/stores/scannedNodeData";
    import Dock from "$lib/modules/Layout/Dock/Dock.svelte";
    import "../../static/styles/style.scss";

    async function bundle() {
        if (browser) {
            await StateService.updateMarketPrices();
            await StateService.updateBrubeckStats();
            await StateService.setBrubeckHistory();

            if (window.ethereum) {
                if (window.ethereum.selectedAddress) {
                    const user = await UserService.upsert(
                        window.ethereum.selectedAddress
                    );

                    $userData = user;

                    if (user) {
                        const data = await UserService.getNodesData(user.nodes);
                        if (data) {
                            $watchListData = data;
                            $scannedNodeData = data.find(
                                (node) => node.address === user.address
                            );
                        }
                    }
                }

                window.ethereum.on("disconnect", function (error) {
                    StateService.clearAuthSession();
                    goto("/");
                });

                window.ethereum.on(
                    "accountsChanged",
                    async function (accounts) {
                        if (accounts.length > 0) {
                            const user = await UserService.upsert(accounts[0]);;
                            $userData = user;
                            if (user) {
                                const data = await UserService.getNodesData(
                                    user.nodes
                                );
                                if (data) {
                                    $watchListData = data;
                                    $scannedNodeData = data.find(
                                        (node) => node.address === user.address
                                    );
                                }
                            }
                        } else {
                            StateService.clearAuthSession();
                            goto("/");
                        }
                    }
                );
            }
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
