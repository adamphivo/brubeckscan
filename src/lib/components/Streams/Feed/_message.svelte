<script lang="ts">
    import { fade } from "svelte/transition";
    import Format from "$lib/helpers/format";

    export let message;
</script>

<div class="{message.type} message" in:fade>
    {#if message.metadata}
        <div class="date">
            <p>
                [{Format.timestamp(message.metadata.messageId.timestamp)}]
            </p>
        </div>
    {/if}
    <div>
        <p>
            {message.content}
        </p>
    </div>
</div>

<style lang="scss">
    .date {
        color: rgb(84, 84, 99);
    }

    .message {
        display: flex;
        gap: 30px;
        align-items: center;
        font-weight: bold;
        font-size: 14px;
    }

    .userAction {
        color: rgb(71, 134, 185);
    }

    .cronRun {
        color: lightgrey;
    }

    .brubeckStat {
        color: rgb(224, 194, 56);
    }
    .brubeckScanStat {
        color: rgb(116, 116, 202);
    }
    .error {
        color: rgb(182, 65, 65);
    }
    .prices {
        color: rgb(15, 194, 69);
    }
    .user {
        color: rgb(98, 228, 195);
    }
    .transaction {
        color: rgb(176, 176, 214);
    }
</style>
