<script lang="ts">
    import Address from "./Cells/_Address.svelte";
    import Name from "./Cells/_Name.svelte";
    import Rewards from "./Cells/_Rewards.svelte";
    import Staked from "./Cells/_Staked.svelte";
    import ClaimCount from "./Cells/_ClaimCount.svelte";
    import Status from "./Cells/_Status.svelte";
    import Actions from "./Cells/_Actions.svelte";

    export let node;
</script>

<tr>
    <Address {node} />
    <Name {node} />
    <Rewards {node} />
    <Staked {node} />
    <ClaimCount {node} />
    <Status {node} />
    <Actions {node} />
</tr>

<style lang="scss">
</style>
