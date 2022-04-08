<script lang="ts">
    import Feed from "$lib/components/Streams/Feed/Feed.svelte";
    import Chat from "$lib/components/Streams/Chat/Chat.svelte";

    let selected = "feed";
</script>

<section>
    <div class="module selector">
        <div
            class="tab {selected === 'feed' ? 'active' : ''}"
            on:click={() => (selected = "feed")}
        >
            Feed
        </div>
        <div
            class="tab {selected === 'chat' ? 'active' : ''}"
            on:click={() => (selected = "chat")}
        >
            Chat
        </div>
    </div>
    {#if selected === "feed"}
        <Feed />
    {:else if selected === "chat"}
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
