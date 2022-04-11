<script lang="ts">
  import { fade } from "svelte/transition";
  import { bundle } from "$lib/helpers/bundle";
  import Loader from "$lib/components/Elements/Loader.svelte";
  import Header from "$lib/components/Layout/Header/Header.svelte";
  import Footer from "$lib/components/Layout/Footer/Footer.svelte";
  import PageTitle from "$lib/components/Layout/PageTitle/PageTitle.svelte";
  import ProgressiveUpdate from "./_progressiveUpdate.svelte";
  import "$lib/assets/stylesheets/styles/style.scss";

  const promise = bundle();
</script>

<main>
  {#await promise}
    <div class="loadingFullScreen">
      <Loader />
    </div>
  {:then}
    <ProgressiveUpdate />
    <div in:fade class="sticky">
      <Header />
    </div>
    <PageTitle />
    <div class="page" in:fade>
      <slot />
    </div>
    <Footer />
  {/await}
</main>

<style>
  :global(*) {
    font-family: "Space Mono", monospace;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 101vh;
  }

  .sticky {
    width: 100%;
    max-width: 1300px;
  }
</style>
