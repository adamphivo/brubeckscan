<script lang="ts">
    import Format from "$lib/helpers/format";
    import { fade } from "svelte/transition";
    export let message;
</script>

<div class="messageContainer" in:fade>
    <div class="date">[{Format.timestamp(message.metadata.messageId.timestamp)}]</div>
    <span style:background-image={message.userGradient} />
    <p>:</p>
    <p class="message">{message.message}</p>
</div>

<style lang="scss">
    .messageContainer {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: bold;
        font-size: 14px;
        span {
            width: 20px;
            height: 20px;
            border-radius: 50%;
        }

        p {
            max-width: 500px;
        }
        .date {
            color: rgb(84, 84, 99);
        }
    }
</style>
