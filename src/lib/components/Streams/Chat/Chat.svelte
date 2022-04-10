<script lang="ts">
    import StreamService from "$lib/services/stream";
    import { userData } from "$lib/stores/userData";
    import Messages from "./Messages.svelte";
    import Connect from "$lib/components/Layout/Header/_Connect.svelte";

    let message = "";

    async function submit() {
        await StreamService.chatStream.publish(
            $userData.address,
            $userData.profile.gradient,
            message.trim()
        );

        message = "";
    }
</script>

<section class="module">
    {#if $userData}
    <div class="messages {$userData ? "" : "blurred"}">
        <Messages />
    </div>
        <form on:submit|preventDefault={submit}>
            <input type="text" bind:value={message} required />
            <button type="submit" value="Submit">Send</button>
        </form>
    {:else}
        <div class="module connect">
            <Connect />
        </div>
    {/if}
</section>

<style lang="scss">
    .module {
        width: 100%;
        border-radius: 0;
        padding: 0;
        gap: 0;
    }

    form {
        display: flex;
        width: 100%;
        padding: 30px;
        gap: 10px;
        input {
            flex-grow: 1;
        }
    }

    .connect {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
        background-color: rgb(19, 18, 18);
        border: 1px solid white;
        padding: 30px;
    }

    .messages {
        position: relative;
    }

    .blurred::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(26, 25, 25);
    }
</style>
