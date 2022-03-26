import { send } from "$lib/helpers/send";
import { userData, watchListData } from "$lib/stores/userData";
import { scannedNodeData } from "$lib/stores/scannedNodeData";
import UserService from "$lib/services/user";

export async function login(address: any) {
    const response = await send("PATCH", `users/${address}.json`);

    const user = await response.json();

    if (user) {
        userData.set(user);
        const watchlist = await UserService.getWatchlist(user.nodes);
        if (watchlist) {
            watchListData.set(watchlist);
            scannedNodeData.set(watchlist.find(
                (node) => node.address === user.address
            ));
        }
    }

    return user;
}