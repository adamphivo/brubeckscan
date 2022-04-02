<script lang="ts">
    import { send } from "$lib/helpers/send";
    import Button from "$lib/components/HTMLElements/Button.svelte";

    export let node;

    let isEditing = false;
    let nodeName = node.dataDB.name;

    async function updateNodeName() {
        const response = await send("PATCH", "users/nodes.json", {
            nodeId: node.dataDB.id,
            newName: nodeName.trim(),
        });
        if (response.ok) {
            const data = await response.json();
            isEditing = false;
            node.dataDB.name = data.name;
        }
    }
</script>

{#if node.dataDB}
    <td>
        <div class="cellContainer">
            <div>
                {#if !isEditing}
                    <p class="name">{node.dataDB.name}</p>
                {:else}
                    <input bind:value={nodeName} maxlength="20" />
                {/if}
            </div>
            <div>
                {#if !isEditing}
                    <button on:click={() => (isEditing = true)}>Edit</button>
                {:else}
                <Button text="Save" action={updateNodeName}></Button>
                <button on:click={() => {isEditing = false;nodeName = node.dataDB.name;}}>Quit</button>
                {/if}
            </div>
        </div>
    </td>
{/if}

<style lang="scss">
    .cellContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
    }
    input {
        font-size: 16px;
        padding: 0;
        border: 0;
        border-radius: 0;
        border-bottom: 1px solid grey;
    }

    .name {
        border-bottom: 1px solid transparent;
    }
</style>
