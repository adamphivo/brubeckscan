<script lang="ts">
  export let action;
  export let text = "";
  export let size = "16px";
  export let icon = null;

  let status = "";

  async function wrap() {
    if (!status) {
      status = "Pending";
      try {
        await action();
        status = "Done";
      } catch (e) {
        status = "Error";
      } finally {
        setTimeout(() => {
          status = "";
        }, 1000);
      }
    } else {
      return;
    }
  }
</script>

<button on:click|preventDefault={wrap} class={status} style:font-size={size}>
  {#if icon}
    <div class="icon" style:width={size}>
        <svelte:component this={icon} />
    </div>
  {/if}
  <span>{text}</span>
</button>

<style lang="scss">
  button {
    font-weight: 800;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &.Pending {
      color: orange;
      border-color: orange;
      user-select: none;
      cursor: wait;
      &:hover {
        background-color: transparent;
        cursor: wait;
      }
    }
    .icon {
        display: flex;
    };
    &.Done {
      color: green;
      border-color: green;
      &:hover {
        background-color: transparent;
      }
    }
    &.Error {
      color: red;
      border-color: red;
      &:hover {
        background-color: transparent;
      }
    }
  }
</style>
