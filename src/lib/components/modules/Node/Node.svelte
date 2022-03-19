<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { session } from "$app/stores";

    export let address = "";
    let nodeData = null;

    onMount(async () => {
        const response = await fetch(`api/node/${address}.json`, {
            method: "GET",
            headers: { internal_token: `${import.meta.env.VITE_AUTH_TOKEN}` },
        });

        const data = await response.json();

        if (data) {
            nodeData = data;
        }
    });
</script>

{#if nodeData}
    <div class="module" in:fade>
        <div>
            <div>{nodeData.address}</div>
            <div>{nodeData.rewardsInData}DATA</div>
            <div>{nodeData.rewardsInData * $session.prices.DATAUSDT}USDT</div>
            <div>{nodeData.claimCount}</div>
        </div>
    </div>
{/if}

<style lang="scss">
    .module {
        width: 100%;
    }
</style>
