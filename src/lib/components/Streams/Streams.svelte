<script lang="ts">
    import Feed from "$lib/components/Streams/Feed/Feed.svelte";

    let selected = "feed";
</script>

<section>
    <div class="module selector">
        <div  class="tab {selected === "feed" ? "active" : ""}" on:click={() => (selected = "feed")}>Feed</div>
    </div>
    {#if selected === "feed"}
        <Feed />
    {/if}
</section>

<style lang="scss">
    .selector {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
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
