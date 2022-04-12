<script lang="ts">
  import { userData } from "$lib/stores/user";
  import Messages from "./Messages.svelte";
  import InputBox from "./_inputBox.svelte";
  import Connect from "$lib/components/Layout/Header/_Connect.svelte";
</script>

<section class="module">
  {#if $userData}
    <div class="messages {$userData ? '' : 'blurred'}">
      <Messages />
    </div>
    <div>
      <InputBox />
    </div>
  {:else}
    <div class="module connect">
      <Connect />
    </div>
  {/if}
</section>

<style lang="scss">
  .module {
    width: 100%;
    border-radius: 0;
    padding: 0;
    gap: 0;
    background-color: transparent;
  }

  .connect {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    background-color: rgb(19, 18, 18);
    border: 1px solid white;
    padding: 30px;
  }

  .messages {
    position: relative;
  }

  .blurred::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(26, 25, 25);
  }
</style>
