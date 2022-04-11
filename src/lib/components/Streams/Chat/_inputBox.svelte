<script lang="ts">
  import StreamService from "$lib/services/stream";
  import { userData } from "$lib/stores/userData";
  import Button from "$lib/components/Elements/Button.svelte";
  import MdSend from "svelte-icons/md/MdSend.svelte";

  let message = "";

  async function send() {
    if (!message) throw new Error('Empty input');
    await StreamService.chatStream.publish(
      $userData.address,
      $userData.profile.gradient,
      message.trim()
    );

    message = "";
  }
</script>

<div>
  <input bind:value={message} required />
  <Button action={send} icon={MdSend} size="32px" />
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    input {
      color: whitesmoke;
      outline: none;
      padding: 30px;
      background-color: rgb(25, 23, 22);
    }
  }
</style>
