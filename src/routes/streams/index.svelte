<script lang="ts">
    import { browser } from "$app/env";
    import streamr from "$lib/clients/streamr";
    import Streams from "$lib/components/Streams/Streams.svelte";
    import Loader from "$lib/components/Elements/Loader.svelte";
    import StreamService from "$lib/services/stream";
    import { STREAMR_STORAGE_NODE_GERMANY } from "streamr-client";

    async function bundle() {
        if (browser) {
            await StreamService.unsubscribeAll();

            const feedStream = await streamr.getOrCreateStream({
                id: import.meta.env.VITE_STREAMR_FEED_STREAMID as string,
            });

            const chatStream = await streamr.getOrCreateStream({
                id: import.meta.env.VITE_STREAMR_CHAT_STREAMID as string,
            });

            const chatStorage = await chatStream.getStorageNodes();

            if (chatStorage.length === 0) {
                await chatStream.addToStorageNode(STREAMR_STORAGE_NODE_GERMANY);
            }

            const chatSubscription = await streamr.subscribe(
                {
                    id: chatStream.id,
                    resend: {
                        last: 100,
                    },
                },
                StreamService.chatStream.onMessage
            );

            const feedSubscription = await streamr.subscribe(
                feedStream.id,
                StreamService.feedStream.onMessage
            );

            return feedSubscription;
        } else {
            return;
        }
    }

    const promise = bundle();
</script>

<div class="modulePool">
    {#await promise}
        <Loader />
    {:then response}
        <Streams />
    {/await}
</div>

<style lang="scss">
    .modulePool {
        display: flex;
        flex-direction: column;
    }
</style>
