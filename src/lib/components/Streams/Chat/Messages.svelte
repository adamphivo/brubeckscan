<script lang="ts">
  import { onMount } from "svelte";
  import StreamService from "$lib/services/stream";
  import { chatMessages } from "$lib/stores/streams/chat";
  import Message from "./_message.svelte";
  import { SyncLoader } from "svelte-loading-spinners";

  onMount(async () => {
    await StreamService.chatStream.scrollToBottom();
  });
</script>

<section id="chat" class="module">
  {#if $chatMessages.length > 0}
    {#each $chatMessages as message}
      <div>
        <Message {message} />
      </div>
    {/each}
  {:else}
    <div class="loaderContainer">
      <SyncLoader size="50" color="lightgrey" unit="px"/>
    </div>
  {/if}
</section>

<style lang="scss">
  .module {
    position: relative;
    width: 100%;
    padding: 0;
    border-radius: 0;
    padding: 30px;
    overflow-y: scroll;
    height: 700px;
    gap: 20px;
    background-color: rgb(28, 25, 25);
  }

  .loaderContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    height: 100%;
  }
</style>
