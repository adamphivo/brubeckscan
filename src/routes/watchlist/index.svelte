<script lang="ts" context="module">
</script>

<script lang="ts">
    import { session } from "$app/stores";
    import { userDataComputed } from "$lib/stores/userData";
</script>

<div class="modulePool">
    <div class="module">
        {#if $userDataComputed}
            {#if $userDataComputed.nodes.length}
                <div>Address{$userDataComputed.nodes[0].address}</div>
                <div>DataStaked{$userDataComputed.nodes[0].dataStaked}</div>
                <div>
                    DataStakedInUSDT{$userDataComputed.nodes[0].dataStaked *
                        $session.prices.DATAUSDT}
                </div>
                <div>
                    RewardsInData{$userDataComputed.nodes[0].rewardsInData}
                </div>
                <div>
                    RewardsInUSDT{$userDataComputed.nodes[0].rewardsInData *
                        $session.prices.DATAUSDT}
                </div>
                <div>ClaimCount{$userDataComputed.nodes[0].claimCount}</div>
            {/if}
        {/if}
    </div>
</div>

<style lang="scss">
</style>
