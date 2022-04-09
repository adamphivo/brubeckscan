import { appCache } from "$lib/helpers/cache";
import Consts from "$lib/consts";
import { formatNodeData } from "./_formatNodeData";
import { requestDataStaked } from "./_getDataStaked";
import { getDataSent } from "./_getDataSent";

export async function get({ params }) {
    try {
        if (params.address) {
            const cached = appCache.get(`${Consts.cache.NODE_AGGREGATED_DATA_BASE}${params.address}`);

            if (cached) return { body: cached };

            const urls = [
                Consts.urls.BRUBECK_NODE_REWARDS_BASE,
                Consts.urls.BRUBECK_NODE_STATS_BASE,
            ];

            const requests = urls.map(async (url) => {
                return await fetch(`${url}${params.address}`);
            });

            requests.push(requestDataStaked(params.address));
            requests.push(getDataSent(params.address));

            const responses = await Promise.all(requests);

            const data = await Promise.all(
                responses.map((response) => response.json())
            );

            const node = formatNodeData(data, params.address);

            appCache.set(`${Consts.cache.NODE_AGGREGATED_DATA_BASE}${params.address}`, node, Consts.cache.NODEDATA_TTL);

            return {
                status: 200,
                body: node
            };
        }
    } catch (e) {
        return {
            status: e.status || 500,
            body: {
                message: e.message
            }
        };
    }
}