<script lang="ts">
    import { browser } from "$app/env";
    import { fade } from "svelte/transition";
    import streamr from "$lib/clients/streamr";
    import PageTitle from "$lib/components/Layout/PageTitle.svelte";
    import { chat } from "$lib/stores/chat";

    let input = "";
    const TITLE = "App Feed";

    async function publish() {
        const msg = {
            message: input,
        };

        await streamr.publish(
            "0xd9925689cb36bfc3e2f82ddacda21c231e126ee8/brubeckscan/test",
            msg
        );
    }

    async function onMessage(content, metadata) {
        const feed = document.querySelector("#feed");
        content.metadata = metadata;
        $chat.messages = [...$chat.messages, content];
        console.log($chat.messages);
        feed.scrollTo({
            top: feed.scrollHeight,
            behavior: "smooth",
        });
    }

    async function bundle() {
        if (browser) {
            const streams = await streamr.unsubscribe();
            const stream = await streamr.getOrCreateStream({
                id: "/brubeckscan/test",
            });
            const subscription = await streamr.subscribe(stream.id, onMessage);
            return subscription;
        } else {
            return;
        }
    }

    function formatTimestamp(timestamp: any) {
        const test = new Date(timestamp);
        return test.toUTCString();
    }

    const promise = bundle();
</script>

<div class="modulePool">
    <PageTitle title={TITLE} />
    {#await promise}
        <div class="module loading">Loading</div>
    {:then test}
    <div class="module" id="flow">
        <div class="module feed" id="feed">
                {#each $chat.messages as message}
                    <div class="{message.type} message" in:fade>
                        <div class="date">
                            [{formatTimestamp(
                                message.metadata.messageId.timestamp
                            )}]
                        </div>
                        <div>
                            {message.content}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/await}
</div>

<style lang="scss">
    .module {
        width: 100%;
        height: 800px;
        gap: 15px;
    }

    .feed {
        overflow-y: hidden;
        padding-bottom: 60px;
    }

    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
    }

    .date {
        color: rgb(84, 84, 99);
    }

    .message {
        display: flex;
        gap: 30px;
        align-items: center;
        font-weight: bold;
        font-size: 14px;
    }

    .userAction {
        color: rgb(71, 134, 185);
    }

    .cronRun {
        color: lightgrey;
    }

    .brubeckStat {
        color: rgb(26, 53, 145);
    }
    .error {
        color: rgb(182, 65, 65);
    }
    .prices {
        color: rgb(21, 168, 65);
    }
</style>
