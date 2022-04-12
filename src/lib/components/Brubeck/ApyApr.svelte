<script lang="ts">
    import { brubeckData } from "$lib/stores/brubeckData";
</script>

{#if $brubeckData.apy}
    <div class="module">
        <h3>Network APY/APR</h3>
        <div class="data">
            <div class="label">
                <p>24H APR</p>
            </div>
            <div class="value">
                <p>
                    {$brubeckData.apy["24h-APR"]}
                </p>
                <span>%</span>
            </div>
        </div>
        <div class="separator" />
        <div class="data">
            <div class="label">
                <p>SPOT APR</p>
            </div>
            <div class="value">
                <p>{$brubeckData.apy["spot-APR"]}</p>
                <span>%</span>
            </div>
        </div>
        <div class="separator" />
        <div class="data">
            <div class="label">
                <p>24H APY</p>
            </div>
            <div class="value">
                <p>
                    {$brubeckData.apy["24h-APY"]}
                </p>
                <span>%</span>
            </div>
        </div>
        <div class="separator" />
        <div class="data">
            <div class="label">
                <p>SPOT APY</p>
            </div>
            <div class="value">
                <p>
                    {$brubeckData.apy["spot-APY"]}
                </p>
                <span>%</span>
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
    .module {
        flex-grow: 1;
        justify-content: space-between;
        gap: 15px;
        border-radius: 0%;
    }
    span {
        color: rgb(59, 212, 59);
    }
    h3 {
        font-size: 22px;
        margin-bottom: 30px;
    }
</style>
