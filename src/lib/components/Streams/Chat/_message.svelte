<script lang="ts">
  import { fade } from "svelte/transition";
  import { userData } from "$lib/stores/user";
  import Format from "$lib/helpers/format";

  export let message;
</script>

<div
  class="messageContainer"
  in:fade
  title={Format.timestamp(message.metadata.messageId.timestamp)}
>
  <span style:background-image={message.userGradient} />
  <p class="message {message.userAddress === $userData.address ? "own" : ""}">
    {message.message}
  </p>
</div>

<style lang="scss">
  .messageContainer {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: bold;
    font-size: 14px;
    padding: 20px 20px;
    transition-duration: 0.3s;
    &:hover {
      background-color: rgb(30, 29, 27);
    }
    border-radius: 20px;
    span {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }

    p {
      max-width: 500px;
      line-height: 22px;
      &.own {
          color: rgb(67, 233, 205);
      }
    }
  }
</style>
