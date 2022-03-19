import { Auth } from "$lib/auth";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    if (event.url.pathname.startsWith('/api')) {
        if (Auth.validateRequest(event.request)) {
            const response = await resolve(event);
            return response;
        } else {
            return new Response(null, { status: 401 })
        }
    } else {
        const response = await resolve(event);
        return response;
    }
}

export async function getSession() {
    try {
        const response = await fetch("http://localhost:3000/api", {
            method: "GET",
            headers: { internal_token: `${import.meta.env.VITE_AUTH_TOKEN}` },
        });

        const data = await response.json();

        if (data) {
            return {
                prices: data.prices,
                brubeck: data.brubeck
            }
        }
    } catch (e) {
        return {};
    }

    return {};
}