import UserDAO from "$lib/dao/user";

export async function get() {
    const countUsers = await UserDAO.count();
    return {
        status: 200,
        body: {
            countUsers: countUsers
        }
    };
}