<script lang="ts">
  import Format from "$lib/helpers/format";
  import { userData } from "$lib/stores/user";
  import MdContentCopy from "svelte-icons/md/MdContentCopy.svelte";
  import FaSearchPlus from "svelte-icons/fa/FaSearchPlus.svelte";

  export let node;

  let copyText = "";

  function copyAddressToClipboard() {
    navigator.clipboard.writeText(node.address);
    copyText = "Copied";
    setTimeout(() => (copyText = ""), 2000);
  }

  const psLink = `https://polygonscan.com/address/${node.address}`;

  let background =
    node.address === $userData.address ? $userData.profile.gradient : "";
</script>

<td style:background class="address">
  <div class="container">
    <div>
      {Format.shortenNodeAddress(node.address)}
    </div>
    <div class="buttonContainer">
      <button on:click={() => copyAddressToClipboard()}>
        {#if copyText}
          {copyText}
        {:else}
          <div class="iconi" title="Copy address to clipboard">
            <MdContentCopy />
          </div>
        {/if}
      </button>
      <a href={psLink} target="_blank">
        <button>
          <div class="iconi" title="Search this address on PolygonScan">
            <FaSearchPlus />
          </div>
        </button>
      </a>
    </div>
  </div>
</td>

<style lang="scss">
  td {
    width: 350px;
  }
  .iconi {
    width: 20px;
    cursor: pointer;
    display: flex;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding: 0 20px;
  }
  .buttonContainer {
    display: flex;
    gap: 10px;
  }

  button {
    background-color: transparent;
    &:hover {
      background-color: rgb(28, 27, 27);
    }
  }
</style>
