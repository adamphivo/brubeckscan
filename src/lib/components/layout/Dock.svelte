<script lang="ts">
    import { session } from "$app/stores";
    import Connect from "$lib/components/modules/Connect.svelte";
    import User from "$lib/components/modules/User.svelte";
    import MdHome from 'svelte-icons/md/MdHome.svelte'
    import MdPoll from 'svelte-icons/md/MdPoll.svelte'
</script>

<div class="container">
    <div class="firstRow row">
        <div>
            <h1>BrubeckScan</h1>
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
            <a href="/">
                <div class="icon">
                    <MdHome />
                </div>
            </a>
            <a href="/network">
                <div class="icon">
                    <MdPoll />
                </div>
            </a>
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
