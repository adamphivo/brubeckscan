export async function get() {
    const URLS = ["https://brubeck1.streamr.network:3013/apy", "https://brubeck1.streamr.network:3013/stats"]

    const requests = URLS.map(async (url) => {
        const request = await fetch(url);
        return request;
    })

    const responses = await Promise.all(requests);

    const [apy, lastRewards] = await Promise.all(responses.map(res => res.json()));

    return {
        status: 200,
        body: {
            apy,
            lastRewards: lastRewards.lastRewards.reverse(),
            lastCode: lastRewards.lastRewards.at(-1).code
        }
    }
}