import { Auth } from "$lib/helpers/auth";
import FeedService from "$lib/services/feeds";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    if (event.url.pathname.startsWith("/api")) {
        if (Auth.validateRequest(event.request)) {
            const response = await resolve(event);
            return response;
        } else {
            return new Response(null, { status: 401 });
        }
    } else {
        const response = await resolve(event);
        return response;
    }
}

/** @type {import('@sveltejs/kit').HandleError} */
export async function handleError({ error }) {
    await FeedService.publish("error", error.message);
}