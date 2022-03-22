<script lang="ts">
    import { session } from "$app/stores";
    import { userDataComputed } from "$lib/stores/userData";
</script>

{#if $userDataComputed}
    <div class="module">
        {#if $userDataComputed.length}
            <div>Address{$userDataComputed[0].address}</div>
            <div>DataStaked{$userDataComputed[0].dataStaked}</div>
            <div>
                DataStakedInUSDT{$userDataComputed[0].dataStaked *
                    $session.prices.DATAUSDT}
            </div>
            <div>
                RewardsInData{$userDataComputed[0].rewardsInData}
            </div>
            <div>
                RewardsInUSDT{$userDataComputed[0].rewardsInData *
                    $session.prices.DATAUSDT}
            </div>
            <div>ClaimCount{$userDataComputed[0].claimCount}</div>
        {/if}
    </div>
{/if}

<style lang="scss">
</style>
