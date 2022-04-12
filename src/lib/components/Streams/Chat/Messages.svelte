<script lang="ts">
    import { onMount } from "svelte";
    import StreamService from "$lib/services/stream";
    import { chatMessages } from "$lib/stores/streams/chat";
    import Message from "./_message.svelte";

    onMount( async () => {
        await StreamService.chatStream.scrollToBottom();
    })
</script>

<section id="chat" class="module">
    {#if $chatMessages.length > 0}
        {#each $chatMessages as message}
            <div>
                <Message {message} />
            </div>
        {/each}
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
        height: 500px;
        gap: 20px;
        background-color: rgb(13, 11, 11);
    }
</style>
