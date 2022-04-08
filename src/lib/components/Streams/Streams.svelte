<script lang="ts">
    import Feed from "$lib/components/Streams/Feed/Feed.svelte";
    import Chat from "$lib/components/Streams/Chat/Chat.svelte";
    import { streamTab } from "$lib/stores/selectedTabs";
</script>

<section>
    <div class="module selector">
        <div
            class="tab {$streamTab === 'feed' ? 'active' : ''}"
            on:click={() => ($streamTab = "feed")}
        >
            Feed
        </div>
        <div
            class="tab {$streamTab === 'chat' ? 'active' : ''}"
            on:click={() => ($streamTab = "chat")}
        >
            Chat
        </div>
    </div>
    {#if $streamTab === "feed"}
        <Feed />
    {:else if $streamTab === "chat"}
        <Chat />
    {/if}
</section>

<style lang="scss">
    .selector {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    .tab {
        width: max-content;
        font-size: 22px;
        color: rgb(95, 95, 95);
        transition-duration: 0.1s;
        padding-bottom: 20px;
        border-bottom: 5px solid transparent;
        &.active {
            color: whitesmoke;
            border-bottom: 5px solid whitesmoke;
        }
        &:hover {
            color: whitesmoke;
            cursor: pointer;
        }
    }
</style>
