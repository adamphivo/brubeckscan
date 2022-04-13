<script lang="ts">
  import { isSyncing } from "$lib/stores/isSyncing";

  export let action;
  export let text = "";
  export let size = "16px";
  export let icon = null;
  export let isAsync = true;

  let status = "";



  async function wrap() {
    if (!status) {
      status = "Pending";
      $isSyncing = true;
      try {
        await action();
        status = "Done";
      } catch (e) {
        status = "Error";
      } finally {
        setTimeout(() => {
          status = "";
          $isSyncing = false;
        }, 1000);
      }
    } else {
      return;
    }
  }
</script>

<button on:click|preventDefault={isAsync ? wrap : action} class={status} style:font-size={size}>
  {#if icon}
    <div class="icon" style:width={size}>
      <svelte:component this={icon} />
    </div>
  {/if}
  {#if text}
    <span>{text}</span>
  {/if}
</button>

<style lang="scss">
  button {
    font-weight: 800;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    &.Pending {
      color: rgb(234, 179, 76);
      border-color: rgb(234, 179, 76);
      user-select: none;
      background-color: transparent;
      cursor: wait;
      &:hover {
        background-color: transparent;
        cursor: wait;
      }
    }
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &.Done {
      color: rgb(62, 202, 62);
      border-color: rgb(62, 202, 62);
      background-color: transparent;
      cursor: not-allowed;
      &:hover {
        background-color: transparent;
      }
    }
    &.Error {
      color: rgb(135, 14, 14);
      border-color: rgb(135, 14, 14);
      background-color: transparent;
      cursor: not-allowed;
      &:hover {
        background-color: transparent;
      }
    }
  }
</style>
