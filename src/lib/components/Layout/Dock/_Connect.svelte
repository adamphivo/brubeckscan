<script lang="ts">
    import { userData, watchListData } from "$lib/stores/userData";
    import UserService from "$lib/services/user";
    import Button from "$lib/components/HTMLElements/Button.svelte"

    async function connect() {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            if (accounts.length > 0) {
                const user = await UserService.upsert(accounts[0]);

                $userData = user;

                if (user) {
                    const data = await UserService.getNodesData(user.nodes);
                                
                    if (data) {
                        $watchListData = data;
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
</script>

<Button action={connect} text="connect"/>
