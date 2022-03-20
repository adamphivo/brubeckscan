import { session } from "$app/stores";

const api = () => { };

api.syncUser = async (address: string, update: object = {}) => {
    const init = {
        method: "PATCH",
        headers: {
            internal_token: `${import.meta.env.VITE_AUTH_TOKEN}`,
        },
        body: JSON.stringify(update)
    };

    
    if (Object.entries(update).length > 0) {
        init.headers['content-type'] = "application/json";
    }

    const response = await fetch(
        `/api/user/${address}.json`,
        init
    );

    const json = await response.json();

    const user = json.data.user;

    session.update((session) => {
        session.user = user;
        return session;
    })

    return user;
}

export default api;