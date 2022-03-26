<script lang="ts">
    import { browser } from "$app/env";
    import streamr from "$lib/clients/streamr";
    import PageTitle from "$lib/components/Layout/PageTitle.svelte";
    import { chat } from "$lib/stores/chat";
    import Loader from "$lib/components/Loader.svelte";
    import Consts from "$lib/consts";
    import Message from "./_message.svelte";

    const TITLE = "App Feed";

    async function bundle() {
        if (browser) {
            await streamr.unsubscribe();
            const stream = await streamr.getOrCreateStream({
                id: Consts.streamr.FEED_STREAM_ID,
            });
            const subscription = await streamr.subscribe(stream.id, onMessage);
            return subscription;
        } else {
            return;
        }
    }

    function onMessage(content, metadata) {
        content.metadata = metadata;
        $chat.messages = [...$chat.messages, content];
        scrollFeedToBottom();
    }

    function scrollFeedToBottom() {
        const feed = document.querySelector("#feed");
        feed.scrollTo({
            top: feed.scrollHeight,
            behavior: "smooth",
        });
    }

    const promise = bundle();
</script>

<div class="modulePool">
    <PageTitle title={TITLE} />
    {#await promise}
        <Loader />
    {:then response}
        <section class="module">
            <div class="module feed" id="feed">
                {#each $chat.messages as message}
                    <Message {message} />
                {/each}
            </div>
        </section>
    {/await}
</div>

<style lang="scss">
    .module {
        width: 100%;
        height: 800px;
        gap: 15px;
    }

    section.module {
        padding: 0;
        background-color: rgb(41, 38, 46);
    }
    .feed {
        overflow-y: hidden;
        padding-bottom: 60px;
    }
</style>
