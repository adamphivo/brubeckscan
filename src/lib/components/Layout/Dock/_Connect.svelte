<script lang="ts">
    import { hasEthereum } from "$lib/stores/userData";
    import Button from "$lib/components/HTMLElements/Button.svelte";

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
    <Button action={connect} text="Connect" />
{:else}
    <a href="https://metamask.io/download/" target="_blank">
        <button>Get Metamask</button>
    </a>
{/if}
