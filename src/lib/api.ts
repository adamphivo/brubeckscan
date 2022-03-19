import { session } from "$app/stores";

const api = () => { };

api.syncUser = async (address: string, update: object = {}) => {
    const init = {
        method: "GET",
        headers: {
            internal_token: `${import.meta.env.VITE_AUTH_TOKEN}`,
        },
    };

    const response = await fetch(
        `/api/user/${address}.json`,
        init
    );

    const json = await response.json();

    const user = json.data.user;

    session.update((session) => {
        session = session;
        session.user = user;
        return session;
    })

    return user;
}

api.getBrubeckDataForNode = async (address: string) => {
    const urls = [
        "https://brubeck1.streamr.network:3013/datarewards/",
        "https://brubeck1.streamr.network:3013/stats/",
    ];

    const requests = urls.map(async (url) => {
        return await fetch(`${url}${address}`);
    });

    const responses = await Promise.all(requests);

    const data = await Promise.all(
        responses.map((response) => response.json())
    );

    if (data) {
        return data;
    }
}

export default api;