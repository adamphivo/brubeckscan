<script lang="ts">
  import Button from "$lib/components/Elements/Button.svelte";
  import { userData, watchListData } from "$lib/stores/userData";
  import { send } from "$lib/helpers/send";
  import UserService from "$lib/services/user";
  import { validate } from "$lib/helpers/validate";
  import MdAdd from "svelte-icons/md/MdAdd.svelte";

  let address = "";
  let error = "";

  async function add() {
    const alreadyRegistered = $watchListData.find((node) => {
      return node.address === address || node.address === address.toLowerCase().trim();
    });

    if (alreadyRegistered) {
      error = "This node is already in your watchlist 😅";
      throw new Error();
    }

    if (validate.ethAddress(address)) {
      const data = {
        userAddress: $userData.address,
        nodeAddress: address.toLowerCase().trim(),
        action: "watch",
      };

      const response = await send("PATCH", "watchlist.json", data);

      const user = await response.json();

      $watchListData = await UserService.processNodes(user.nodes);

      error = "";
    } else {
      throw new Error();
    }
  }
</script>

<div class="module">
  {#if error}
    <span>
      {error}
    </span>
  {/if}
  <input
    type="text"
    placeholder="Enter a node ETH public address to add it to your watchlist"
    bind:value={address}
  />
  <div class="iconi">
    <Button icon={MdAdd} size="22px" action={add} />
  </div>
</div>

<style lang="scss">
  .module {
    width: 100%;
    margin-top: 30px;
    flex-direction: row;
    flex-wrap: wrap;
    input {
      flex-grow: 1;
    }
  }

  .iconi {
    display: flex;
  }

  span {
    color: lightcoral;
    border: 1px solid lightcoral;
    padding: 10px;
    font-size: 12px;
    width: 100%;
  }
</style>
