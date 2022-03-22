<script lang="ts">
    import { session } from "$app/stores";
    import { send } from "$lib/helpers/send";
    import { userData, userDataComputed } from "$lib/stores/userData";
    import UserService from "$lib/services/user";
    import Button from "$lib/modules/Components/Button.svelte"

    async function getNodesData(nodes: any) {
        const requests = nodes.map((node) => {
            return send("GET", `brubeck/node/${node.address}.json`);
        });

        const responses = await Promise.all(requests);

        const data = await Promise.all(
            responses.map((response) => response.json())
        );

        return data;
    }

    async function connect() {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            if (accounts.length > 0) {
                const user = await UserService.upsert(accounts[0]);
                $session.user = user;
                $userData = user;
                // Get nodes infos in bundling step for a smoother experience
                if (user) {
                    const data = await getNodesData(user.nodes);
                    if (data) {
                        $userDataComputed = data;
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
</script>

<Button action={connect} text="connect"/>
