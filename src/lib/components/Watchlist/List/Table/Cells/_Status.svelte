<script lang="ts">
  import { formatDistance } from "date-fns";
  import { brubeckData } from "$lib/stores/brubeckData";
  export let node;
  const now = new Date();
  const latestClaim = new Date(node?.claimedRewardCodes[0]?.claimTime);
  const distance = formatDistance(latestClaim, now, { addSuffix: true });
  const hasClaimedTheLatestKnownCode = node?.claimedRewardCodes.find(
    (code) => code.id === $brubeckData.lastCode
  );
</script>

<td>
  <div class="container">
    {#if node?.claimedRewardCodes.length === 0}
      <p class="ko" title="This node never claimed a reward code">KO</p>
    {:else}
      {#if hasClaimedTheLatestKnownCode}
        <p class="ok" title="This node claimed the latest reward code">OK</p>
      {:else}
        <p class="ko" title="This node did not claimed the latest reward code">KO</p>
      {/if}
      <p title="Last reward code claimed">{distance}</p>
    {/if}
  </div>
</td>

<style lang="scss">
  td {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: relative;
    width: 150px;
  }

  .container {
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }

  p {
    font-weight: bold;
  }

  .ok {
    color: lightgreen;
  }
  .ko {
    color: rgb(226, 88, 88);
  }
</style>
