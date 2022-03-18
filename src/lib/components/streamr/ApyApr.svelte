<script lang="ts">
    export let data;
</script>

{#if data}
    <div class="container">
        {#each Object.entries(data) as entry}
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
    .container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        border: 1px solid rgb(231, 231, 231);
        background-color: rgba(0, 0, 0, 0.322);
        border-radius: 5px;
        padding: 30px;
    }

    .data {
        display: flex;
        justify-content: space-between;
        gap: 50px;
        align-items: center;
        font-size: 18px;
    }
</style>
