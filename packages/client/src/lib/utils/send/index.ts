import { PUBLIC_API_BASE_URL, PUBLIC_API_TOKEN } from "$env/static/public";

// Wrapper function used to query the API
export default async function send(
  address: string,
  method: string = "GET",
  body?: object
) {
  try {
    const init = {
      headers: new Headers({
        Authorization: `Bearer ${PUBLIC_API_TOKEN}`,
        "Content-Type": "application/json",
      }),
      method: method,
      body: JSON.stringify(body),
    };

    const response = await fetch(`${PUBLIC_API_BASE_URL}${address}`, init);

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
  }
}
