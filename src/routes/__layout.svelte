<script lang="ts">
    import { fade } from "svelte/transition";
    import { bundle } from "$lib/bundle";
    import Loader from "$lib/components/Loader.svelte";
    import Dock from "$lib/components/Layout/Dock/Dock.svelte";
    import Footer from "$lib/components/Layout/Footer/Footer.svelte";
    import PageTitle from "$lib/components/Layout/PageTitle.svelte";
    import "../../static/styles/style.scss";

    const promise = bundle();
</script>

<main>
    {#await promise}
        <Loader />
    {:then}
        <div in:fade class="sticky">
            <Dock />
        </div>
        <PageTitle title="BrubeckScan" />
        <div class="page" in:fade>
            <slot />
        </div>
        <Footer />
    {/await}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    :global(*) {
        font-family: "Space Mono", monospace;
    }
    .sticky {
        width: 100%;
        max-width: 1300px;
    }
</style>
