<script lang="ts">
  import Address from "./Cells/_Address.svelte";
  import Name from "./Cells/_Name.svelte";
  import Rewards from "./Cells/_Rewards.svelte";
  import Staked from "./Cells/_Staked.svelte";
  import ClaimCount from "./Cells/_ClaimCount.svelte";
  import Status from "./Cells/_Status.svelte";
  import Actions from "./Cells/_Actions.svelte";
  import Received from "./Cells/_Received.svelte";
  import ToBeReceived from "./Cells/_ToBeReceived.svelte";
  import Payouts from "./Cells/_Payouts.svelte";

  export let node;

  console.log(node);
</script>

<tr>
  <Address {node} />
  <Name {node} />
  <Status {node} />
  <Rewards {node} />
  <Received {node} />
  <ToBeReceived {node} />
  <Staked {node} />
  <ClaimCount {node} />
  <Payouts {node} />
  <Actions {node} />
</tr>

<style lang="scss">
</style>
