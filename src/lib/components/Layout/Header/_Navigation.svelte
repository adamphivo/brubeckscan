<script lang="ts">
    import { page } from "$app/stores";
    import { userData } from "$lib/stores/userData";
    import MdHome from "svelte-icons/md/MdHome.svelte";
    import MdPoll from "svelte-icons/md/MdPoll.svelte";
    import MdBookmark from "svelte-icons/md/MdBookmark.svelte";
    import MdSearch from "svelte-icons/md/MdSearch.svelte";
    import FaBroadcastTower from 'svelte-icons/fa/FaBroadcastTower.svelte'
</script>

<div class="navigationIcons">
    <a href="/" title="Home">
        <div class="icon" class:active={$page.url.pathname === "/"}>
            <MdHome />
        </div>
    </a>
    <a href="/network" title="Network">
        <div class="icon" class:active={$page.url.pathname === "/network"}>
            <MdPoll />
        </div>
    </a>
    <a href="/scan" title="Scan">
        <div class="icon" class:active={$page.url.pathname === "/scan"}>
            <MdSearch />
        </div>
    </a>
    <a href="/streams" title="Streams">
        <div class="icon" class:active={$page.url.pathname === "/streams"}>
            <FaBroadcastTower />
        </div>
    </a>
    {#if $userData}
        <a href="/watchlist" title="Watchlist">
            <div
                class="icon"
                class:active={$page.url.pathname === "/watchlist"}
            >
                <MdBookmark />
            </div>
        </a>
    {/if}
</div>

<style lang="scss">
    .navigationIcons {
        display: flex;
        gap: 10px;
    }
    .icon {
        padding: 5px;
        &.active {
            color: whitesmoke;
        }
        width: 40px;
        transition-duration: 0.2s;
        color: gray;
        &:hover {
            color: white;
        }
    }
</style>
