<script lang="ts">
    import { session } from "$app/stores";
    export let mode = "dock";
</script>

{#if mode === "dock"}
    <div class="dock">
        <div class="connected">connected</div>
        <a href="/">
            <div
                style:background={$session.user.profile.gradient}
                class="gradient"
            />
        </a>
    </div>
{/if}

{#if mode === "module"}
    <div class="module">
        <p>{$session.user.address}</p>
        <p>{$session.user.profile.id}</p>
    </div>
{/if}

{#if mode === "noUser"}
    <div class="module inactive">
        <p>USER_ADDRESS_PLACEHOLDER</p>
        <p>USER_PROFILE_ID_PLACEHOLDER</p>
    </div>
{/if}

<style lang="scss">
    p {
        width: max-content;
    }
    .dock {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    .gradient {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
    .module {
        width: 100%;
    }

    .connected {
        border: 1px solid lightgreen;
        color: lightgreen;
        padding: 5px;
        font-size: 12px;
        margin-right: 5px;
    }

    .inactive {
        position: relative;
        p {
            position: relative;
        }

        p::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: lightgrey;
        }
    }
</style>
