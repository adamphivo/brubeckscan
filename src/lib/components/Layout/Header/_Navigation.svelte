<script lang="ts">
  import { page } from "$app/stores";
  import { links } from "$lib/stores/links";
  import { userData } from "$lib/stores/user"
</script>

<div class="navigationIcons">
  {#each $links as link}
    <a href={link.url} title={link.title} class="{link.url === "/watchlist" && !$userData ? "hidden" : ""}">
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

  .hidden {
    display: none;
  }
</style>
