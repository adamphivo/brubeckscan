<script lang="ts">
    import { page } from "$app/stores";
    import Connect from "./_Connect.svelte";
    import DockUser from "./_DockUser.svelte";
    import MdHome from "svelte-icons/md/MdHome.svelte";
    import MdPoll from "svelte-icons/md/MdPoll.svelte";
    import MdBookmark from "svelte-icons/md/MdBookmark.svelte";
    import MdSearch from 'svelte-icons/md/MdSearch.svelte'
    import { userData } from "$lib/stores/userData";
</script>

<div class="container">
    <div class="firstRow row">
        <div>
            <h1>BrubeckScan<span class="beta">beta</span></h1>
        </div>
        <div>
            {#if !$userData}
                <Connect />
            {:else}
                <DockUser />
            {/if}
        </div>
    </div>
    <div class="secondRow row">
        <div class="navigationIcons">
            <a sveltekit:prefetch href="/" title="Home">
                <div class="icon" class:active={$page.url.pathname === "/"}>
                    <MdHome />
                </div>
            </a>
            <a  sveltekit:prefetch href="/network" title="Network">
                <div
                    class="icon"
                    class:active={$page.url.pathname === "/network"}
                >
                    <MdPoll />
                </div>
            </a>
            <a  sveltekit:prefetch href="/scan" title="Network">
                <div
                    class="icon"
                    class:active={$page.url.pathname === "/scan"}
                >
                    <MdSearch />
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
    </div>
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

    .beta {
        border: thin solid white;
        margin-left: 10px;
        padding: 5px;
        font-size: 12px;
    }
    .container {
        position: sticky;
        top: 0;
        width: 100%;
        flex-direction: column;
        align-items: center;
        display: flex;
        z-index: 2;
    }

    .row {
        display: flex;
        width: 100%;
        max-width: var(--site-max-width);
        justify-content: space-between;
        align-items: center;
        padding: 10px 0px;
    }
    .secondRow {
        background-color: var(--color-black-transparent);
        height: 70px;
    }

    .firstRow {
        background-color: var(--color-black);
        padding: 20px 0px;
    }
</style>
