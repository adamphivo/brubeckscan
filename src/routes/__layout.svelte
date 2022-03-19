<script lang="ts">
    import api from "$lib/api";
    import Dock from "$lib/components/layout/Dock.svelte";
    import { browser } from "$app/env";
    import { session } from "$app/stores";
    import { onMount } from "svelte";
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
                $session.selectedAddress = null;
                $session.user = null;
                $session.currentNodeData = null;
                console.log(error);
            });

            window.ethereum.on("accountsChanged", async function (accounts) {
                if (accounts.length > 0) {
                    $session.selectedAddress = accounts[0];
                    const sync = await api.syncUser(accounts[0]);
                    const nodeData = await api.getBrubeckDataForNode(
                        accounts[0]
                    );
                    $session.currentNodeData = nodeData;
                } else {
                    $session.selectedAddress = null;
                    $session.user = null;
                    $session.currentNodeData = null;
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
    main {
        min-height: 120vh;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    :global(*) {
        font-family: "Space Mono", monospace;
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
