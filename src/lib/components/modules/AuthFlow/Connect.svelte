<script lang="ts">
    import api from "$lib/api";

    async function connect() {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            if (accounts.length > 0) {
                const sync = await api.syncUser(accounts[0]);
            }
        } catch (e) {
            console.log(e);
        }
    }
</script>

<button on:click|preventDefault={connect}>
    <p>Connect</p>
</button>

<style lang="scss">
</style>
