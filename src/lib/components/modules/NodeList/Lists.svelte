<script lang="ts">
    import { session } from "$app/stores";
    import MdAdd from "svelte-icons/md/MdAdd.svelte";
    import List from "$lib/components/modules/NodeList/List.svelte";
</script>

{#if $session?.user?.nodelists?.length === 0}
    <div class="module inactive">
        <h3>Nodeslists</h3>
        <div />
    </div>
{/if}
{#if $session?.user?.nodelists?.length > 0}
    <table>
        <thead>
            <tr>
                <th></th>
                <th>List Name</th>
                <th>Number of nodes</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each $session.user.nodelists as list}
                <List {list} />
            {/each}
        </tbody>
    </table>
{/if}
<!-- Create button -->
<a href="/lists/create">
    <button class="module create">
        <div class="icon">
            <MdAdd />
        </div>
    </button>
</a>

<style lang="scss">
    a {
        width: 100%;
    }
    button {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .icon {
        width: 30px;
    }
    .module {
        width: 100%;
    }

    .create {
        padding: 10px;
    }

    .inactive {
        min-height: 100px;
    }

    .inactive::after {
        content: "You have no list yet. Let's create one ...";
    }
</style>
