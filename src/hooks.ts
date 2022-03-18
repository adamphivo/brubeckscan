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