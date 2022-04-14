import { Auth } from "$lib/helpers/auth";
import StreamService from "$lib/services/stream";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  await StreamService.logsStream.publish(event);
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
export async function handleError({ error, event }) {
  await StreamService.logsStream.publish(event, error);
}
