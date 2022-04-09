<script lang="ts">
  import { page } from "$app/stores";
  import { links } from "$lib/stores/links";
</script>

<div class="navigationIcons">
  {#each $links as link}
    <a href={link.url} title={link.title}>
      <div class="icon" class:active={$page.url.pathname === link.url}>
        <svelte:component this={link.icon} />
      </div>
    </a>
  {/each}
</div>

<style lang="scss">
  .navigationIcons {
    display: flex;
    gap: 20px;
  }
  .icon {
    &.active {
      color: whitesmoke;
    }
    width: 30px;
    transition-duration: 0.2s;
    color: gray;
    &:hover {
      color: white;
    }
  }
</style>
