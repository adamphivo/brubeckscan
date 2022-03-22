<script lang="ts">
    import { session } from "$app/stores";
    import { userData } from "$lib/stores/userData";
    import UserService from "$lib/services/user";

    async function connect() {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            if (accounts.length > 0) {
                const user = await UserService.upsert(accounts[0]);
                $session.user = user;
                $userData = user;
            }
        } catch (e) {
            console.log(e);
        }
    }
</script>

<button on:click|preventDefault={connect}>
    <p>Connect</p>
</button>
