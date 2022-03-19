<script lang="ts">
    import { session } from "$app/stores";
    import api from "$lib/api";

    async function connect() {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
    
            $session.selectedAddress = accounts[0];
    
            const sync = await api.syncUser($session.selectedAddress);
        } catch(e) {
            console.log(e);
        }

    }
</script>

<button on:click|preventDefault={connect}>
    <p>Connect</p>
</button>

<style lang="scss">
</style>
