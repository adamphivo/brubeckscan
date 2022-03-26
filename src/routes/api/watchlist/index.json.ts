import UserDAO from "$lib/dao/user";

export async function patch({ request }) {
    const input = await request.json();
    
    const updatedUser = await UserDAO.updateWatchlist(input.userAddress, input.nodeAddress, input.action);

    return {
        status: 200,
        body: updatedUser
    };
}