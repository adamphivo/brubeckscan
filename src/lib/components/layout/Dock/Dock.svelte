<script lang="ts">
    import { session } from "$app/stores";
    import Connect from "$lib/components/modules/AuthFlow/Connect.svelte";
    import User from "$lib/components/modules/AuthFlow/User.svelte";
    import MdHome from 'svelte-icons/md/MdHome.svelte'
    import MdPoll from 'svelte-icons/md/MdPoll.svelte'
    import MdList from 'svelte-icons/md/MdList.svelte'
</script>

<div class="container">
    <div class="firstRow row">
        <div>
            <h1>BrubeckScan<span class="beta">beta</span></h1>
        </div>
        <div>
            {#if !$session.user}
                <Connect />
            {:else}
                <User mode="dock" />
            {/if}
        </div>
    </div>
    <div class="secondRow row">
        <div class="navigationIcons">
            <a href="/" title="home">
                <div class="icon">
                    <MdHome />
                </div>
            </a>
            <a href="/network" title="network">
                <div class="icon">
                    <MdPoll />
                </div>
            </a>
            {#if $session.user}
                <a sveltekit:prefetch href="/lists" title="lists">
                    <div class="icon">
                        <MdList />
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
        width: 30px;
        transition-duration: 0.2s;
        color: gray;
        &:hover {
            color: white;
        }
    }

    .beta {
        border: 1px solid white;
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
        padding: 30px 0px;
    }
    .secondRow {
        background-color: var(--color-black-transparent);
    }

    .firstRow {
        background-color: var(--color-black);
        padding: 30px 0px;
    }
</style>
