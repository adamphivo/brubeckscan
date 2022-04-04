<script lang="ts">
    import { browser } from "$app/env";
    import streamr from "$lib/clients/streamr";
    import { feed } from "$lib/stores/feed";
    import Consts from "$lib/consts";
    import Feed from "$lib/components/Feed/Feed.svelte";
    import Loader from "$lib/components/Loader.svelte";

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
        <Loader/>
    {:then response}
        <Feed />
    {/await}
</div>

<style lang="scss">
    .modulePool {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
</style>
