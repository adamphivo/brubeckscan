<script lang="ts">
  import MdBookmarkBorder from "svelte-icons/md/MdBookmarkBorder.svelte";
  import MdBookmark from "svelte-icons/md/MdBookmark.svelte";
  import FaSearchPlus from "svelte-icons/fa/FaSearchPlus.svelte";
  import { userData } from "$lib/stores/user";
  import { nodesData } from "$lib/stores/nodes";
  import { scannedNodeData } from "$lib/stores/scannedNodeData";
  import { send } from "$lib/helpers/send";

  $: userHasNode = $userData.nodes.find((node) => {
    return node.address == $scannedNodeData.address;
  });

  $: isOwner = $scannedNodeData?.address === $userData?.address;
  $: psLink = `https://polygonscan.com/address/${$scannedNodeData.address}`;

  async function update(action: string) {
    // A owner cannot delete his node from his watchlist
    if (isOwner && action === "unwatch") return;

    const response = await send("PATCH", "watchlist.json", {
      userAddress: $userData.address,
      nodeAddress: $scannedNodeData.address,
      action: action,
    });

    const user = await response.json();

    if (action === "watch") {
      const dataDB = user.nodes.find(
        (node) => node.address === $scannedNodeData.address
      );
      $scannedNodeData.dataDB = dataDB;
      $nodesData.push($scannedNodeData);
    }

    if (action === "unwatch") {
      $nodesData = $nodesData.filter(
        (node) => node.address !== $scannedNodeData.address
      );
    }

    $userData = user;
  }
</script>

<div class="bookmark">
  {#if userHasNode}
    <button
      class="icon {isOwner ? 'noDelete' : ''}"
      title="Unwatch"
      on:click|preventDefault={() => update("unwatch")}
    >
      <MdBookmark />
    </button>
  {:else}
    <button
      class="icon"
      title="Watch"
      on:click|preventDefault={() => update("watch")}
    >
      <MdBookmarkBorder />
  </button>
  {/if}
  <!-- button -->
  <a href={psLink} target="_blank">
    <button class="icon" title="Search this address on PolygonScan">
      <FaSearchPlus />
    </button>
  </a>
</div>

<style lang="scss">
  .bookmark {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
  }

  .icon {
    width: 40px;
    cursor: pointer;
    transition-duration: 0.2s;
  }

  .icon.noDelete {
    &:hover {
      cursor: not-allowed;
      transform: unset;
    }
  }
</style>
