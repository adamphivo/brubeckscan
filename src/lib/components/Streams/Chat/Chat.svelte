<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import StreamService from "$lib/services/stream";
  import { userData } from "$lib/stores/user";
  import Messages from "./Messages.svelte";
  import InputBox from "./_inputBox.svelte";
  import Connect from "$lib/components/Auth/Connect.svelte";
  import Id from "../_id.svelte";

  onMount(async () => {
    await StreamService.chatStream.getAndSubscribe();
    StreamService.chatStream.scrollToBottom();
  });

  onDestroy(async () => {});
</script>

<section class="module">
  {#if $userData}
    <div class="messages">
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

<Id stream={StreamService.chatStream} />

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
</style>
