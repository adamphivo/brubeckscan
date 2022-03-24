import { appCache } from "$lib/helpers/cache";
import Consts from "$lib/consts";
import { formatNodeData } from "./_formatNodeData";
import { requestDataStaked } from "./_getDataStaked";

export async function get({ params }) {
    if (params.address) {
        const cached = appCache.get(`${Consts.cache.NODE_AGGREGATED_DATA_BASE}${params.address}`);

        if (cached) {
            return {
                body: cached
            };
        } else {
            const urls = [
                Consts.urls.BRUBECK_NODE_REWARDS_BASE,
                Consts.urls.BRUBECK_NODE_STATS_BASE,
            ];

            const requests = urls.map(async (url) => {
                return await fetch(`${url}${params.address}`);
            });

            requests.push(requestDataStaked(params.address));

            const responses = await Promise.all(requests);

            const data = await Promise.all(
                responses.map((response) => response.json())
            );

            const node = formatNodeData(data, params.address);

            appCache.set(`${Consts.cache.NODE_AGGREGATED_DATA_BASE}${params.address}`, node, Consts.cache.GLOBAL_TTL);

            return {
                status: 200,
                body: node
            };
        }
    }
}