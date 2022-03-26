import UserDAO from "$lib/dao/user";
import FeedService from "$lib/services/feeds";

export async function patch({ params, request }) {
    let update = null;

    if (request.body) {
        const data = await request.json();
        if (data) {
            update = data;
        }
    }

    const user = await UserDAO.upsertByAddress(params.address, update);

    await FeedService.publish("user", "User connected 🥳");

    return {
        status: 200,
        body: user
    };
}