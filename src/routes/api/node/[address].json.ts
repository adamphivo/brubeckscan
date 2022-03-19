export async function get({ params, request }) {
    if (params.address) {
        const urls = [
            "https://brubeck1.streamr.network:3013/datarewards/",
            "https://brubeck1.streamr.network:3013/stats/",
        ];

        const requests = urls.map(async (url) => {
            return await fetch(`${url}${params.address}`);
        });

        const responses = await Promise.all(requests);

        const data = await Promise.all(
            responses.map((response) => response.json())
        );

        console.log(data);

        return {
            status: 200,
            body: data
        }
    }
}