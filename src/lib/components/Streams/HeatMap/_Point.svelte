<script lang="ts">
  import { userData } from "$lib/stores/user";
  export let content;
</script>

<div
  style:top={content.posY}
  style:left={content.posX}
  title={content.userAddress}
  class={$userData.address === content.userAddress ? "owner" : ""}
  id={content.userAddress}
>
  <p style:background={content.userGradient} />
</div>

<style lang="scss">
  div {
    position: absolute;
    padding: 10px;
    transition-duration: 0.6s;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.owner {
      box-shadow: 0 0 20px rgba(137, 180, 255, 0.579);
    }
    &:hover {
      background-color: rgb(20, 19, 19);
      transform: scale(2);
    }
    p {
      width: 5px;
      height: 5px;
    }
  }
</style>
