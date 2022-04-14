<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import StreamService from "$lib/services/stream";
  import { feed } from "$lib/stores/streams/feed";
  import Message from "./_message.svelte";

  onMount(async () => {
    await StreamService.feedStream.getAndSubscribe();
    StreamService.feedStream.scrollFeedToBottom();
  });

  onDestroy(async () => {
    await StreamService.feedStream.unsubscribe();
  });
</script>

<section class="module">
  <div class="module feed" id="feed">
    {#each $feed.messages as message}
      <Message {message} />
    {/each}
  </div>
</section>

<style lang="scss">
  .module {
    width: 100%;
    flex-grow: 1;
    gap: 15px;
    background-color: transparent;
    height: 700px;
    overflow-y: scroll;
    background-color: rgb(20, 20, 20);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  section.module {
    padding: 0;
  }

  .feed {
    overflow-y: hidden;
    padding-bottom: 30px;
    background-color: rgb(24, 22, 22);
    border-radius: 0;
  }
</style>
