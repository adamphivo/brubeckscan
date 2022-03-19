<script lang="ts">
    import { session } from "$app/stores";
</script>

{#if $session.brubeck.apy}
    <div class="module">
        {#each Object.entries($session.brubeck.apy) as entry}
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
