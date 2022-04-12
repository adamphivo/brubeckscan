<script lang="ts">
    import { hasEthereum } from "$lib/stores/user";
    import Button from "$lib/components/Elements/Button.svelte";

    async function connect() {
        try {
            await (window as any).ethereum.request({
                method: "eth_requestAccounts",
            });
        } catch (e) {
            throw e;
        }
    }
</script>

{#if $hasEthereum}
    <div class="connect">
        <Button action={connect} text="Connect" />
    </div>
{:else}
    <a href="https://metamask.io/download/" target="_blank">
        <button>Get MetaMask</button>
    </a>
{/if}

<style>
    .connect {
        padding: 10px;
    }
</style>