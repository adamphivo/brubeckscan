<script lang="ts">
    import { session } from "$app/stores";
    import ApyApr from "$lib/components/modules/Brubeck/ApyApr.svelte";
    import Prices from "$lib/components/modules/Markets/Prices.svelte";
    import LatestRewardCode from "$lib/components/modules/Brubeck/LatestRewardCode.svelte";
    import { userDataComputed } from "$lib/stores/user";
</script>

<section class="modulePool">
    <ApyApr />
    <Prices />
    <LatestRewardCode />
    {#if $userDataComputed}
        {#if $userDataComputed.nodes.length}
            <div>Address{$userDataComputed.nodes[0].address}</div>
            <div>DataStaked{$userDataComputed.nodes[0].dataStaked}</div>
            <div>
                DataStakedInUSDT{$userDataComputed.nodes[0].dataStaked *
                    $session.prices.DATAUSDT}
            </div>
            <div>RewardsInData{$userDataComputed.nodes[0].rewardsInData}</div>
            <div>
                RewardsInUSDT{$userDataComputed.nodes[0].rewardsInData *
                    $session.prices.DATAUSDT}
            </div>
            <div>ClaimCount{$userDataComputed.nodes[0].claimCount}</div>
        {/if}
    {/if}
</section>
