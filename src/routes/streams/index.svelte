<script lang="ts">
    import { browser } from "$app/env";
    import streamr from "$lib/clients/streamr";
    import Streams from "$lib/components/Streams/Streams.svelte";
    import Loader from "$lib/components/Elements/Loader.svelte";
    import StreamService from "$lib/services/stream";

    async function bundle() {
        if (browser) {
            await StreamService.unsubscribeAll();

            const feedStream = await streamr.getOrCreateStream({
                id: import.meta.env.VITE_STREAMR_FEED_STREAMID as string,
            });

            const feedSubscription = await streamr.subscribe(feedStream.id, StreamService.feedStream.onMessage);

            return feedSubscription;
        } else {
            return;
        }
    }

    const promise = bundle();
</script>

<div class="modulePool">
    {#await promise}
        <Loader/>
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
