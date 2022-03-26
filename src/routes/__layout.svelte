<script lang="ts">
    import { fade } from "svelte/transition";
    import { bundle } from "$lib/bundle";
    import Loader from "$lib/components/Loader.svelte";
    import Dock from "$lib/components/Layout/Dock/Dock.svelte";
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
        <div class="page" in:fade>
            <slot />
        </div>
    {/await}
</main>

<style>
    :global(*) {
        font-family: "Space Mono", monospace;
    }
</style>
