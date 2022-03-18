<script lang="ts">
    import { session } from "$app/stores";
    import { onMount } from "svelte";

    async function connect() {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        const account = accounts[0];

        $session.selectedAddress = account;

        const init = {
            method: "GET",
            headers: {
                internal_token: `${import.meta.env.VITE_AUTH_TOKEN}`,
            },
        };

        const response = await fetch(
            `/api/user/${$session.selectedAddress}.json`,
            init
        );

        const json = await response.json();

        if (response.ok) {
            $session.user = json.data.user;
        }
    }

    onMount(async () => {
        $session.user = $session.user;
    });
</script>

{#if $session.user}
    <div class="user">
        <p>{$session.user.address}</p>
        <div
            style:background={$session.user.profile.gradient}
            class="gradient"
        />
    </div>
{:else}
    <button on:click|preventDefault={connect}>
        <p>Connect</p>
    </button>
{/if}

<style lang="scss">
    button {
        border: 1px solid gray;
        padding: 4px 10px;
        border-radius: 5px;
        transition-duration: 0.2s;
        &:hover {
            cursor: pointer;
        }
    }
    .gradient {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }

    .user {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
</style>
