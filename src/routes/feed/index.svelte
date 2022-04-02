<script lang="ts">
    import { browser } from "$app/env";
    import streamr from "$lib/clients/streamr";
    import PageTitle from "$lib/components/Layout/PageTitle.svelte";
    import { feed } from "$lib/stores/feed";
    import Loader from "$lib/components/Loader.svelte";
    import Consts from "$lib/consts";
    import Feed from "$lib/components/Feed/Feed.svelte";

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
        $feed.messages = [...$feed.messages, content];
        // Need some time before the feed height is recalculated / Need to update the HTML element first
        setTimeout(scrollFeedToBottom, 100);
    }

    function scrollFeedToBottom() {
        const feed = document.querySelector("#feed");
        if (!feed) return;
        feed.scrollTo({
            top: feed.scrollHeight,
            behavior: "smooth",
        });
    }

    const promise = bundle();
</script>

<div class="modulePool">
    {#await promise}
        <div class="module">Loading</div>
    {:then response}
        <Feed />
    {/await}
</div>

<style lang="scss">
    .module {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 50px;
            background: linear-gradient(var(--color-black), #9198e500);
        }
    }

    .modulePool {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
</style>
