<script lang="ts">
    import { session } from "$app/stores";
    import Bookmark from "./_Bookmark.svelte";

    export let address;

    export let mode = "module";

    async function getNodeData() {
        const response = await fetch(`/api/node/${address}.json`, {
            method: "GET",
            headers: {
                internal_token: `${import.meta.env.VITE_AUTH_TOKEN}`,
            },
        });

        const data = await response.json();

        return data;
    }

    const promise = getNodeData();
</script>

{#if mode === "module"}
    <div class="module">
        {#await promise}
            <div>loading</div>
        {:then data}
            <div>
                <div>{data.address}</div>
                <div>{data.rewardsInData}DATA</div>
                <div>{data.rewardsInData * $session.prices.DATAUSDT}USDT</div>
                <div>{data.claimCount}</div>
                {#if $session.user}
                    <Bookmark {address} />
                {/if}
            </div>
        {/await}
    </div>
{/if}

{#if mode === "table"}
    <tr>
        {#await promise}
            <td>0xd9925689cb36bfc3e2f82ddacda21c231e126ee8</td>
            <td>0</td>
            <td>0USDT</td>
            <td>0</td>
        {:then data}
            <td>{data.address}</td>
            <td>{data.rewardsInData}DATA</td>
            <td>{data.rewardsInData * $session.prices.DATAUSDT}USDT</td>
            <td>{data.claimCount}</td>
        {/await}
    </tr>
{/if}

<style lang="scss">
    .module {
        width: 100%;
    }
</style>
