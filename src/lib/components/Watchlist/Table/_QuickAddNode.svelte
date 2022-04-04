<script lang="ts">
    import Button from "$lib/components/Elements/Button.svelte";
    import { userData, watchListData } from "$lib/stores/userData";
    import { send } from "$lib/helpers/send";
    import UserService from "$lib/services/user";

    let address = "";

    async function add(){
        const data = {
            userAddress: $userData.address,
            nodeAddress: address.toLowerCase(),
            action: "watch"
        };

        const response = await send("PATCH", 'watchlist.json', data);

        const user = await response.json();

        $watchListData = await UserService.getWatchlist(user.nodes);
    }
</script>

<div class="module">
        <input 
            type="text" 
            placeholder="Enter a node ETH public address to add it to your watchlist"
            bind:value={address}
        />
        <Button 
            text="Add" 
            action={add} 
        />
</div>

<style lang="scss">
    .module {
        width: 100%;
        margin-top: 30px;
        flex-direction: row;
        input {
            flex-grow: 1;
        }
    }
</style>
