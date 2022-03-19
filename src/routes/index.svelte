<script lang="ts">
    import { session } from "$app/stores";
    import ApyApr from "$lib/components/modules/ApyApr.svelte";
    import Market from "$lib/components/modules/Market.svelte";
    import User from "$lib/components/modules/User.svelte";
    import ScanNode from "$lib/components/modules/Brubeck/ScanNode.svelte";
    import NodeData from "$lib/components/modules/Brubeck/NodeData.svelte";
</script>

<!-- Pages are actually more like modules pool -->
<section class="modulePool">
    {#if $session.user}
        <User mode="module" />
    {:else}
        <User mode="noUser" />
    {/if}
    <ApyApr />
    <Market />
    <ScanNode />
    <NodeData />
</section>
