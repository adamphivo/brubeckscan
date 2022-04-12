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
  <div class="info">
    <span style:background-image={message.userGradient} class="icon"/>
    <p class="address">[{Format.shortenNodeAddress(message.userAddress)}]</p>
  </div>
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
    flex-wrap: wrap;
    font-size: 14px;
    padding: 20px 20px;
    background-color: rgb(37, 36, 36);
    transition-duration: 0.3s;
    border-radius: 20px;
    .address {
      color: rgb(70, 66, 66);
      font-size: 12px;
    }
    .info {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
    }
    p {
      line-height: 22px;
      &.own {
          color: rgb(67, 233, 205);
      }
    }
  }

  .icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
</style>
