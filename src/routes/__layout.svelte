<script lang="ts">
    import { fade } from "svelte/transition";
    import { bundle } from "$lib/helpers/bundle";
    import Loader from "$lib/components/Loader.svelte";
    import Header from "$lib/components/Layout/Header/Header.svelte";
    import Footer from "$lib/components/Layout/Footer/Footer.svelte";
    import PageTitle from "$lib/components/Layout/PageTitle/PageTitle.svelte";
    import "$lib/assets/stylesheets/styles/style.scss";

    const promise = bundle();
</script>

<main>
    {#await promise}
        <Loader />
    {:then}
        <div in:fade class="sticky">
            <Header />
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
