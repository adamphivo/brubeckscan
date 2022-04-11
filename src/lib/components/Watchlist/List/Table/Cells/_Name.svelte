<script lang="ts">
  import { send } from "$lib/helpers/send";
  import Button from "$lib/components/Elements/Button.svelte";
  import MdModeEdit from "svelte-icons/md/MdModeEdit.svelte";
  import MdSave from "svelte-icons/md/MdSave.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";

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
      <div class="actionContainer">
        {#if !isEditing}
          <button on:click={() => (isEditing = true)}>
            <div class="iconi">
              <MdModeEdit />
            </div>
          </button>
        {:else}
          <Button icon={MdSave} size="22px" action={updateNodeName} />
          <button
            on:click={() => {
              isEditing = false;
              nodeName = node.dataDB.name;
            }}
          >
            <div class="iconi">
              <MdClose />
            </div>
          </button>
        {/if}
      </div>
    </div>
  </td>
{/if}

<style lang="scss">
  td {
    width: 400px;
  }

  .actionContainer {
      display: flex;
      gap: 10px;
  }
  .iconi {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
