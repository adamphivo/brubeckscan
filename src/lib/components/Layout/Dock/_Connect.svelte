<script lang="ts">
    import { hasEthereum, userData, watchListData } from "$lib/stores/userData";
    import UserService from "$lib/services/user";
    import Button from "$lib/components/HTMLElements/Button.svelte";

    async function connect() {
        try {
            const accounts = await (window as any).ethereum.request({
                method: "eth_requestAccounts",
            });

            if (accounts.length > 0) {
                const user = await UserService.upsert(accounts[0]);

                $userData = user;

                if (user) {
                    const data = await UserService.getWatchlist(user.nodes);

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

{#if $hasEthereum}
    <Button action={connect} text="Connect" />
{:else}
    <a href="https://metamask.io/download/" target="_blank">
        <button>Get Metamask</button>
    </a>
{/if}
