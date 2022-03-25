import UserDAO from "$lib/dao/user";
import FeedService from "$lib/services/feeds";

export async function get() {
    const countUsers = await UserDAO.count();
    await FeedService.publish("appStat", `BRUBECK SCAN | ${countUsers} USERS`);
    return {
        status: 200,
        body: {
            countUsers: countUsers
        }
    };
}