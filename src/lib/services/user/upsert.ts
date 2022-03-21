import { send } from "$lib/helpers/send";

export async function upsert(address: string, update: object = {}) {
    const response = await send('PATCH', `users/${address}.json`, update)
    const user = await response.json()
    return user;
}