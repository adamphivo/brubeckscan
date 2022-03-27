<script lang="ts">
    import { brubeckData } from "$lib/stores/brubeckData";

    export let node;
</script>

<td>
    {#if node?.claimedRewardCodes[0]?.id === $brubeckData?.lastCode}
        <p class="ok" title="Claimed the latest reward code">OK</p>
    {:else}
        <p class="ko" title="Did not claim the latest reward code">KO</p>
    {/if}
</td>

<style lang="scss">
    .ok {
        color: lightgreen;
    }
    .ko {
        color: rgb(226, 88, 88);
    }
</style>
