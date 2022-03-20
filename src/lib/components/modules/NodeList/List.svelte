<script lang="ts">
    import { session } from "$app/stores";
    import api from "$lib/api";

    export let list;

    async function deleteList() {
        const update = {
            nodelists: {
                delete: {
                    id: list.id,
                },
            },
        };

        const result = await api.syncUser($session.user.address, update);
    }
</script>

<tr>
    <td>
        <div class="pastille" style:background={list.color} />
    </td>
    <td>{list.name}</td>
    <td>{list.nodes.length}</td>
    <td>
        <a href="/lists/{list.id}">
            <button>See</button>
        </a>
        <button on:click={deleteList}>Delete</button>
    </td>
</tr>

<style>
    .pastille {
        width: 100%;
        height: 10px;
    }
</style>
