<script lang="ts">
  import Format from "$lib/helpers/format";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { scannedNodeData } from "$lib/stores/scannedNodeData";
  import { marketPrices } from "$lib/stores/marketPrices";
  import { userData } from "$lib/stores/user";
  import Bookmark from "./_Bookmark.svelte";
  import { send } from "$lib/helpers/send";
  import { validate } from "$lib/helpers/validate";
  import { selectedScanCurrency } from "$lib/stores/selectedCurrency";
  import { formatDistance } from "date-fns";
  import { brubeckData } from "$lib/stores/brubeckData";
  import CurrencySelector from "$lib/components/Markets/CurrencySelector.svelte";

  $: isUserOwner = $userData?.address === $scannedNodeData?.address;

  let copyText = "Copy";

  function copyAddressToClipboard() {
    navigator.clipboard.writeText($scannedNodeData.address);
    copyText = "Copied";
    setTimeout(() => (copyText = "Copy"), 2000);
  }

  const now = new Date();

  $: latestClaim = new Date($scannedNodeData?.claimedRewardCodes[0]?.claimTime || null);
  $: hasClaimedTheLatestKnownCode = $scannedNodeData?.claimedRewardCodes.find(
    (code) => code.id === $brubeckData.lastCode
  );
  $: distance = formatDistance(latestClaim, now, { addSuffix: true });

  onMount(async () => {
    const address = $page.url.searchParams.get("address");
    if (address) {
      if (validate.ethAddress(address)) {
        const response = await send(
          "GET",
          `nodes/${address.toLowerCase()}.json`
        );
        const node = await response.json();

        if (node) {
          $scannedNodeData = node;
        }
      } else {
        throw new Error();
      }
    } else {
      return {};
    }
  });
</script>

{#if $scannedNodeData}
  <div class="module {isUserOwner ? 'owner' : ''}">
    {#if $userData}
      <div class="data">
        {#if isUserOwner}
          <div
            title="Owner"
            style:background={$userData.profile.gradient}
            class="userGradient"
          />
        {/if}
        <Bookmark />
      </div>
    {/if}
    <div />
    <div class="data">
      <div class="label">
        <p>Node ETH Public Address</p>
      </div>
      <div class="value">
        <p>
          {Format.shortenNodeAddress($scannedNodeData.address)}
        </p>
        <button on:click={copyAddressToClipboard}>{copyText}</button>
      </div>
    </div>
    <div class="separator" />
    <div class="selector">
      <CurrencySelector store={selectedScanCurrency} />
    </div>
    <div class="separator" />
    <div class="data">
      <div class="label">
        <p>Staked</p>
      </div>
      <div class="value">
        {#if $selectedScanCurrency === "data"}
          <p>{Format.tokenValue($scannedNodeData.dataStaked)}</p>
          <p class="currency {$selectedScanCurrency}">DATA</p>
        {:else if $selectedScanCurrency === "usdt"}
          <p>
            {Format.tokenValue(
              $scannedNodeData.dataStaked * $marketPrices.DATAUSDT
            )}
          </p>
          <p class="currency {$selectedScanCurrency}">USDT</p>
        {:else if $selectedScanCurrency === "eur"}
          <p>
            {Format.tokenValue(
              ($scannedNodeData.dataStaked * $marketPrices.DATAUSDT) /
                $marketPrices.EURUSDT
            )}
          </p>
          <p class="currency {$selectedScanCurrency}">EUR</p>
        {/if}
      </div>
    </div>
    <div class="separator" />
    <div class="data">
      <div class="label">
        <p>Accumulated rewards</p>
      </div>
      <div class="value {$selectedScanCurrency}">
        {#if $selectedScanCurrency === "data"}
          <p>{Format.twoDecimals($scannedNodeData.rewardsInData)}</p>
          <p class="currency {$selectedScanCurrency}">DATA</p>
        {:else if $selectedScanCurrency === "usdt"}
          <p>
            {Format.tokenValue(
              $scannedNodeData.rewardsInData * $marketPrices.DATAUSDT
            )}
          </p>
          <p class="currency {$selectedScanCurrency}">USDT</p>
        {:else if $selectedScanCurrency === "eur"}
          <p>
            {Format.tokenValue(
              ($scannedNodeData.rewardsInData * $marketPrices.DATAUSDT) /
                $marketPrices.EURUSDT
            )}
          </p>
          <p class="currency {$selectedScanCurrency}">EUR</p>
        {/if}
      </div>
    </div>
    <div class="separator" />
    <div class="data">
      <div class="label">
        <p>Received rewards</p>
      </div>
      <div class="value {$selectedScanCurrency}">
        {#if $selectedScanCurrency === "data"}
          <p>{Format.twoDecimals($scannedNodeData.dataSent)}</p>
          <p class="currency {$selectedScanCurrency}">DATA</p>
        {:else if $selectedScanCurrency === "usdt"}
          <p>
            {Format.twoDecimals(
              $scannedNodeData.dataSent * $marketPrices["DATAUSDT"]
            )}
          </p>
          <p class="currency {$selectedScanCurrency}">USDT</p>
        {:else if $selectedScanCurrency === "eur"}
          <p>
            {Format.twoDecimals(
              ($scannedNodeData.dataSent * $marketPrices["DATAUSDT"]) /
                $marketPrices.EURUSDT
            )}
          </p>
          <p class="currency {$selectedScanCurrency}">EUR</p>
        {/if}
      </div>
    </div>
    <div class="separator" />
    <div class="data">
      <div class="label">
        <p>Rewards to be received</p>
      </div>
      <div class="value {$selectedScanCurrency}">
        {#if $selectedScanCurrency === "data"}
          <p>
            {Format.twoDecimals(
              $scannedNodeData.rewardsInData - $scannedNodeData.dataSent
            )}
          </p>
          <p class="currency {$selectedScanCurrency}">DATA</p>
        {:else if $selectedScanCurrency === "usdt"}
          <p>
            {Format.twoDecimals(
              ($scannedNodeData.rewardsInData - $scannedNodeData.dataSent) *
                $marketPrices["DATAUSDT"]
            )}
          </p>
          <p class="currency {$selectedScanCurrency}">USDT</p>
        {:else if $selectedScanCurrency === "eur"}
          <p>
            {Format.twoDecimals(
              (($scannedNodeData.rewardsInData - $scannedNodeData.dataSent) *
                $marketPrices["DATAUSDT"]) /
                $marketPrices.EURUSDT
            )}
          </p>
          <p class="currency {$selectedScanCurrency}">EUR</p>
        {/if}
      </div>
    </div>
    <div class="separator" />
    <div class="data">
      <div class="label">
        <p>Claim count</p>
      </div>
      <div class="value">
        <p>
          {$scannedNodeData.claimCount} reward code{$scannedNodeData.claimCount >
          1
            ? "s"
            : ""}
        </p>
      </div>
    </div>
    <div class="separator" />
    <div class="data">
      <div class="label"><p>Status / Latest claim</p></div>
      <div class="value">
        <div class="container">
          {#if $scannedNodeData.claimedRewardCodes.length === 0}
            <p class="ko" title="This node never claimed a reward code">KO</p>
          {:else}
            {#if hasClaimedTheLatestKnownCode}
              <p class="ok" title="This node claimed the latest reward code">
                OK
              </p>
            {:else}
              <p
                class="ko"
                title="This node did not claimed the latest reward code"
              >
                KO
              </p>
            {/if}
            <p>/</p>
            <p title="Last reward code claimed">{distance}</p>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .module {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: thin solid transparent;
    border-radius: 0;
  }
  .userGradient {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .module.owner {
    border: thin solid rgb(67, 233, 205);
    border-radius: 0;
  }

  .currency.data {
    color: var(--color-orange);
  }

  .currency.usdt {
    color: rgb(100, 218, 161);
  }

  .currency.eur {
    color: rgb(85, 81, 217);
  }

  .value {
    display: flex;
    align-items: center;
  }

  .container {
    display: flex;
    gap: 32px;
  }

  .ok {
    color: lightgreen;
  }
  .ko {
    color: rgb(226, 88, 88);
  }

  .selector {
    display: flex;
    justify-content: flex-end;
  }
</style>
