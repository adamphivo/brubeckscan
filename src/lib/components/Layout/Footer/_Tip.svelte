<script lang="ts">
  import Format from "$lib/helpers/format";
  import { userData } from "$lib/stores/user";
  import Button from "$lib/components/Elements/Button.svelte";
  import StreamService from "$lib/services/stream";
  import Connect from "$lib/components/Auth/Connect.svelte";

  async function tip() {
    try {
      await (window as any).ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: $userData.address,
            to: "0x2BC4019cbA9d02927c9Be04D5cD5D055FC222581",
            value: "0x29a2241af62c0000",
          },
        ],
      });

      await StreamService.feedStream.publish(
        "tip",
        `${Format.shortenNodeAddress(
          $userData.address
        )} just tipped ! Thank you 🙏`
      );
    } catch (e) {
      throw e;
    }
  }
</script>

<div>
  {#if $userData}
    <Button text="Tip 🥳" action={tip} size="12px" />
  {:else}
    <Connect />
  {/if}
</div>

<style lang="scss">
  div {
    width: max-content;
  }
</style>
