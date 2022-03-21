<script lang="ts">
    import { session } from "$app/stores";
    import UserService from "$lib/services/user";

    async function connect() {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            if (accounts.length > 0) {
                const user = await UserService.upsert(accounts[0]);
                $session.user = user;
            }
        } catch (e) {
            console.log(e);
        }
    }
</script>

<button on:click|preventDefault={connect}>
    <p>Connect</p>
</button>
