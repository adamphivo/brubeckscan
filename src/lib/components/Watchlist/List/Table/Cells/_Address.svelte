<script lang="ts">
  import Format from "$lib/helpers/format";
  import { userData } from "$lib/stores/userData";
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
    <div on:click={() => copyAddressToClipboard()}>
      {#if copyText}
        {copyText}
      {:else}
        <div class="iconi" title="Copy address to clipboard">
          <MdContentCopy />
        </div>
      {/if}
    </div>
    <a href={psLink} target="_blank">
      <div class="iconi" title="Search this address on PolygonScan">
        <FaSearchPlus />
      </div>
    </a>
  </div>
</td>

<style lang="scss">
  td {
    width: 300px;
  }
  .iconi {
    width: 20px;
    cursor: pointer;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding: 0 20px;
  }
</style>
