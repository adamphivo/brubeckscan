import UserDAO from "$lib/dao/user";
import FeedService from "$lib/services/feeds";


export async function patch({ request }) {
    const input = await request.json();
    
    const updatedUser = await UserDAO.updateWatchlist(input.userAddress, input.nodeAddress, input.action);

    await FeedService.publish("userAction", "Node list updated 🎉");

    return {
        status: 200,
        body: updatedUser
    };
}