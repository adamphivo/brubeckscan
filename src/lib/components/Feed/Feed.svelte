<script lang="ts">
    import { onMount } from "svelte";
    import Message from "./_message.svelte";
    import { feed } from "$lib/stores/feed";

    function scrollFeedToBottom() {
        const feed = document.querySelector("#feed");
        if (!feed) return;
        feed.scrollTo({
            top: feed.scrollHeight,
            behavior: "smooth",
        });
    }

    onMount(async () => {
        scrollFeedToBottom();
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
