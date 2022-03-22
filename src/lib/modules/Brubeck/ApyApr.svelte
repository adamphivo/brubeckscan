<script lang="ts">
    import { brubeckData } from "$lib/stores/brubeckData";
</script>

{#if $brubeckData.apy}
    <div class="module">
        {#each Object.entries($brubeckData.apy) as entry}
            <div class="data">
                <span class="key">
                    {entry[0]}
                </span>
                <span class="value">
                    {entry[1]}
                </span>
            </div>
        {/each}
    </div>
{/if}

<style lang="scss">
    .data {
        display: flex;
        justify-content: space-between;
        gap: 50px;
        align-items: center;
    }
</style>
