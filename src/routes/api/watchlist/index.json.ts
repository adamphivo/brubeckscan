import WatchlistService from "$lib/services/watchlist/index.json";

export async function patch({ request, params }) {
    const input = await request.json();
    
    const updatedUser = await WatchlistService.updateWatchlist(input.userAddress, input.nodeAddress, input.action);

    return {
        status: 200,
        body: updatedUser
    }
}