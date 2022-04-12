<script lang="ts">
  import { hasEthereum } from "$lib/stores/user";
  import Button from "$lib/components/Elements/Button.svelte";
  import Metamask from "$lib/assets/icons/Metamask.svelte";

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
    <Button action={connect} text="Connect" icon={Metamask} />
  </div>
{:else}
  <a href="https://metamask.io/download/" target="_blank">
    <button>
      <p>Get Metamask</p>
      <!-- <Metamask /> -->
    </button>
  </a>
{/if}

<style>
  .connect {
    padding: 10px;
  }
  p {
    display: inline;
  }
  button {
    display: flex;
    gap: 20px;
    padding: 10px 20px;
    width: max-content;
  }
</style>
