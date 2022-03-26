import UserDAO from "$lib/dao/user";

export async function patch({ params }) {
    const user = await UserDAO.getOrCreate(params.address);

    return {
        status: 200,
        body: user
    };
}