import UserDAO from "$lib/dao/user";

export async function patch({ params, request }) {
    let update = null;

    if (request.body) {
        const data = await request.json();
        if (data) {
            update = data;
        }
    }

    const user = await UserDAO.upsertByAddress(params.address, update)

    return {
        status: 200,
        body: {
            ...user
        }
    }
}