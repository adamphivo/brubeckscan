const BASE_URL = import.meta.env.VITE_BASE_API_PATH;
const TOKEN = import.meta.env.VITE_AUTH_TOKEN;

/**
 * Helper method used to query the internal API
 * @param method 
 * @param path 
 * @param data 
 * @returns 
 */
export async function send(method: string, path: string, data: any = null) {
    const url = `${BASE_URL}${path}`

    const init = {
        method: method,
        headers: {
            internal_token: `${TOKEN}`
        }
    }

    if (method != "GET" && data) {
        init['body'] = JSON.stringify(data);
    }

    return await fetch(url, init);
}