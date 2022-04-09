<script lang="ts">
    import { brubeckData } from "$lib/stores/brubeckData";
    import { time } from "$lib/helpers/time";

    export let node;
</script>

<td>
    <div class="container">
        {#if node?.claimedRewardCodes.length === 0}
            <p class="ko" title="This node never claimed a reward code">KO</p>
        {:else}
            {#if node?.claimedRewardCodes[0]?.id === $brubeckData?.lastCode}
                <p class="ok" title="Claimed the latest reward code">OK</p>
            {:else}
                <p class="yellow" title="Reward code distribution ongoing">
                    ~
                </p>
            {/if}
            <div title="Time since last reward code was claimed by that node">
                {time.since(
                    new Date(node?.claimedRewardCodes[0]?.claimTime),
                    "minutes"
                )}
            </div>
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

    p {
        font-weight: bold;
    }

    .ok {
        color: lightgreen;
    }
    .ko {
        color: rgb(226, 88, 88);
    }

    .yellow {
        color: rgb(204, 175, 45);
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
</style>
