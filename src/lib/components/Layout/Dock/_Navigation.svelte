<script lang="ts">
    import { page } from "$app/stores";
    import { userData } from "$lib/stores/userData";
    import MdHome from "svelte-icons/md/MdHome.svelte";
    import MdPoll from "svelte-icons/md/MdPoll.svelte";
    import MdBookmark from "svelte-icons/md/MdBookmark.svelte";
    import MdSearch from "svelte-icons/md/MdSearch.svelte";
    import MdAllInclusive from "svelte-icons/md/MdAllInclusive.svelte";
</script>

<div class="navigationIcons">
    <a sveltekit:prefetch href="/" title="Home">
        <div class="icon" class:active={$page.url.pathname === "/"}>
            <MdHome />
        </div>
    </a>
    <a sveltekit:prefetch href="/network" title="Network">
        <div class="icon" class:active={$page.url.pathname === "/network"}>
            <MdPoll />
        </div>
    </a>
    <a sveltekit:prefetch href="/scan" title="Network">
        <div class="icon" class:active={$page.url.pathname === "/scan"}>
            <MdSearch />
        </div>
    </a>
    <a sveltekit:prefetch href="/feed" title="Feed">
        <div class="icon" class:active={$page.url.pathname === "/feed"}>
            <MdAllInclusive />
        </div>
    </a>
    {#if $userData}
        <a sveltekit:prefetch href="/watchlist" title="Watchlist">
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
            border-bottom: thin solid white;
        }
        width: 40px;
        transition-duration: 0.2s;
        color: gray;
        &:hover {
            color: white;
        }
    }
</style>
