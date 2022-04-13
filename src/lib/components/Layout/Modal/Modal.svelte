<script lang="ts">
  import disableScroll from "disable-scroll";
  import { fade } from "svelte/transition";
  import { modals } from "$lib/stores/modals";
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import Button from "$lib/components/Elements/Button.svelte";

  $: scroll = $modals.isModalOpen ? disableScroll.on() : disableScroll.off();
  
  const closeModal = () => {
    $modals.isModalOpen = false;
  };
</script>

{#if $modals.isModalOpen}
  <section transition:fade>
    <div class="mainContainer">
      <div class="close">
        <Button
          action={closeModal}
          icon={MdClose}
          size="32px"
          isAsync={false}
        />
      </div>
      {#if $modals.component}
        <svelte:component this={$modals.component} />
      {/if}
    </div>
  </section>
{/if}

<style lang="scss">
  section {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 5;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
    @media (max-width: 768px) {
      height: 100vh;
    }
  }

  .close {
    align-self: end;
  }

  .mainContainer {
    background-color: var(--color-black);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 30px;
    max-width: var(--site-max-width);
    width: 100%;
    gap: 30px;
  }
</style>
