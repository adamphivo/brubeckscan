import Consts from "$lib/consts";
import { appCache } from "$lib/helpers/cache";
import { getStats } from "./_getStats";
import { getRewards } from "./_getRewards";
import { getDataSent } from "./_getDataSent";
import { getDataStaked } from "./_getDataStaked";
import { format } from "./_format";

export async function get({ params }) {
  try {
    if (params.address) {
      const address: string = params.address;
      const cached = appCache.get(
        `${Consts.cache.NODE_AGGREGATED_DATA_BASE}${address}`
      );

      if (cached) return { body: cached };

      const requests = [
        getStats(address),
        getRewards(address),
        getDataSent(address),
        getDataStaked(address),
      ];

      const responses = await Promise.allSettled(requests);

      const data = await Promise.all(
        responses.map(async (response) => {
          if (response.status === "fulfilled") {
              const data = await response.value.json();
              return data;
          }
        })
      );

      const node = format(data, address);

      appCache.set(
        `${Consts.cache.NODE_AGGREGATED_DATA_BASE}${params.address}`,
        node,
        Consts.cache.NODEDATA_TTL
      );

      return {
        status: 200,
        body: node,
      };
    }
  } catch (e) {
    return {
      status: e.status || 500,
      body: {
        message: e.message,
      },
    };
  }
}
