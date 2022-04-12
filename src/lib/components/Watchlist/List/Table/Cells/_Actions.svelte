<script lang="ts">
  import Format from "$lib/helpers/format";
  import { userData } from "$lib/stores/user";
  import { nodesData } from "$lib/stores/nodes";
  import { send } from "$lib/helpers/send";
  import Button from "$lib/components/Elements/Button.svelte";
  import StreamService from "$lib/services/stream";
  import MdSend from "svelte-icons/md/MdSend.svelte";
  import MdRemove from "svelte-icons/md/MdRemove.svelte";

  export let node;

  async function sendFund() {
    try {
      await (window as any).ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: $userData.address,
            to: node.address,
          },
        ],
      });

      StreamService.feedStream.publish(
        "transaction",
        `Transaction | From ${Format.shortenNodeAddress(
          $userData.address
        )} to ${Format.shortenNodeAddress(node.address)} ⚡`
      );
    } catch (e) {
      throw e;
    }
  }

  async function unwatch() {
    const response = await send("PATCH", "watchlist.json", {
      userAddress: $userData.address,
      nodeAddress: node.address,
      action: "unwatch",
    });

    const user = await response.json();

    if (user) {
      $nodesData = $nodesData.filter((element) => {
        return element.address !== node.address;
      });
    }

    $userData = user;
  }
</script>

<td>
  <div class="buttonContainer">
    {#if node.address != $userData.address}
      <Button action={sendFund} icon={MdSend} size="20px" />
      <Button action={unwatch} icon={MdRemove} size="20px" />
    {:else}
      <div class="owner">Owner</div>
    {/if}
  </div>
</td>

<style lang="scss">
  .buttonContainer {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 20px;
  }

  .owner {
    color: rgb(67, 233, 205);
    font-weight: bold;
    font-size: 18px;
  }
</style>
