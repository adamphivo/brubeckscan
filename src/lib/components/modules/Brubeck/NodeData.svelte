<script lang="ts">
    import { session } from "$app/stores";
    import { onMount } from "svelte";
    import api from "$lib/api";

    onMount(async () => {
        if ($session.currentNodeData) return;

        const nodeData = await api.getBrubeckDataForNode(
            $session?.user?.id || window.ethereum.selectedAddress || ""
        );

        if (nodeData) {
            $session.currentNodeData = nodeData;
        }
    });
</script>

{#if $session.currentNodeData}
    <div class="module">
        <div>
            <p>accumulatedRewardsInData</p>
            <p>{$session.currentNodeData[0].DATA || 0}</p>
        </div>
        <div>
            <p>accumulatedRewardsInUSDT</p>
            <p>{$session.currentNodeData[0].DATA * 4}</p>
        </div>
        <div>
            <p>claimCount</p>
            <p>{$session.currentNodeData[1].claimCount}</p>
        </div>
        <div>
            <p>claimPercentage</p>
            <p>{$session.currentNodeData[1].claimPercentage}</p>
        </div>
    </div>
{/if}

<style lang="scss">
    .module {
        width: 100%;
    }
</style>
