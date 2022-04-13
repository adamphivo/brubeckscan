<script lang="ts">
  import Button from "$lib/components/Elements/Button.svelte";
  import MdList from "svelte-icons/md/MdList.svelte";
  import { modals } from "$lib/stores/modals";
  import Payout from "$lib/components/Layout/Modal/_Payouts.svelte";

  export let node;

  const payouts = node.payouts;

  const openModals = () => {
    $modals.isModalOpen = true;
    $modals.payouts = payouts;
    $modals.component = Payout;
  };
</script>

<td>
  {#if payouts.length > 0}
    <div>
      <Button action={openModals} icon={MdList} size="20px" isAsync={false} />
    </div>
  {:else}
    <div class="payout"></div>
  {/if}
</td>

<style lang="scss">
  td {
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .payout {
        text-align: center;
    }
  }
</style>
