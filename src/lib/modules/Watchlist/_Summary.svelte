<script lang="ts">
    import { session } from "$app/stores";

    import { watchListSummary } from "$lib/stores/userData";
</script>

{#if $watchListSummary}
    <div class="module moduleTitle">
        <h3>Summary</h3>
    </div>
    <div class="module">
        <div class="data">
            <div class="label">
                <p>nodes count</p>
            </div>
            <div class="value">
                <p>{$watchListSummary.count}</p>
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>totalClaimCount</p>
            </div>
            <div class="value">
                <p>{$watchListSummary.totalClaimCount}</p>
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>totalRewardsInData</p>
            </div>
            <div class="value">
                <p>{$watchListSummary.totalRewardsInData}</p>
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>totalRewardsInUSDT</p>
            </div>
            <div class="value">
                <p>
                    {$watchListSummary.totalRewardsInData *
                        $session.prices.DATAUSDT}
                </p>
            </div>
        </div>
        <div />
        <div class="data">
            <div class="label">
                <p>totalDataStaked</p>
            </div>
            <div class="value">
                <p>{$watchListSummary.totalDataStaked}</p>
            </div>
        </div>
        <div class="data">
            <div class="label">
                <p>totalDataStakedInUSDT</p>
            </div>
            <div class="value">
                <p>
                    {$watchListSummary.totalDataStaked *
                        $session.prices.DATAUSDT}
                </p>
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
    .module {
        width: 50%;
        gap: 10px;
    }
    .data {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .label,
    .data {
        font-size: 18px;
    }
</style>
