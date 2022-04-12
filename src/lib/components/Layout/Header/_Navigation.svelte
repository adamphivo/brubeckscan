<script lang="ts">
  import { page } from "$app/stores";
  import { links } from "$lib/stores/links";
  import { userData } from "$lib/stores/user";
  import ProfileIcon from "$lib/components/User/ProfileIcon.svelte";
</script>

<nav class="navigationIcons">
  {#each $links as link}
    <a
      href={link.url}
      title={link.title}
      class="{link.url === '/watchlist' && !$userData ? 'hidden' : ''} {$page
        .url.pathname === link.url
        ? 'active'
        : ''}"
    >
      <div class="icon" class:active={$page.url.pathname === link.url}>
        <svelte:component this={link.icon} />
      </div>
    </a>
  {/each}
  {#if $userData}
    <ProfileIcon />
  {/if}
</nav>

<style lang="scss">
  nav {
    display: flex;
    align-items: center;
    gap: 10px;
    a {
      transition-duration: 0.3s;
      padding: 10px;
      &:hover, &.active {
        color: white;
        border-radius: 20px;
        background-color: rgb(40, 38, 38);
      }
    }
  }

  .icon {
    transition-duration: 0.2s;
    width: 30px;
    color: gray;
    &.active,
    &:hover {
      color: whitesmoke;
    }
  }

  .hidden {
    display: none;
  }
</style>
