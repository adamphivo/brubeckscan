<script lang="ts">
    import { session } from "$app/stores";
    import api from "$lib/api";

    export let address;
    let listId;

    async function submit() {
        const update = {
            nodelists: {
                update: {
                    where: {
                        id: listId,
                    },
                    data: {
                        nodes: {
                            create: {
                                name: "Default Node Name",
                                address: address,
                            },
                        },
                    },
                },
            },
        };

        const sync = await api.syncUser($session.user.address, update);
    }
</script>

<div>
    <form on:submit|preventDefault={submit}>
        {#if $session.user.nodelists.length === 0}
            <a href="/lists/create">
                <button>create list</button>
            </a>
        {:else}
            <select bind:value={listId}>
                {#each $session.user.nodelists as list}
                    <option value={list.id} default>{list.name}</option>
                {/each}
            </select>
            <button type="submit">Add to watchlist</button>
        {/if}
    </form>
</div>
