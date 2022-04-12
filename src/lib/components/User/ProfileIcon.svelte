<script lang="ts">
  import { page } from "$app/stores";
  import { userData } from "$lib/stores/user";
  console.log($page.url.pathname);
</script>

<aside class={$page.url.pathname === "/profile" ? "active" : ""}>
  <a href="/profile">
    <div style:background={$userData.profile.gradient} />
  </a>
</aside>

<style lang="scss">
  aside {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px;
    transition-duration: 0.3s;
    &.active {
      background-color: rgb(40, 38, 38);
      border-radius: 20px;
    }
    &:hover {
      background-color: rgb(40, 38, 38);
      border-radius: 20px;
    }
    div {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
</style>
