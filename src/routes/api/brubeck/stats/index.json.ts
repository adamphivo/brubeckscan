import { appCache } from "$lib/helpers/cache";
import Consts from "$lib/consts";
import FeedService from "$lib/services/feeds";

export async function get() {
    const cached = appCache.get(Consts.cache.BRUBECK_STATS);

    if (cached) {
        return {
            body: cached
        };
    } else {
        const urls = [Consts.urls.BRUBECK_APY, Consts.urls.BRUBECK_STATS];

        const requests = urls.map(async (url) => {
            const request = await fetch(url);
            return request;
        });

        const responses = await Promise.all(requests);

        const [apy, lastRewards] = await Promise.all(responses.map(res => res.json()));

        const data = {
            apy,
            lastRewards: lastRewards.lastRewards.reverse(),
            lastCode: lastRewards.lastRewards.at(-1).code
        };

        appCache.set(Consts.cache.BRUBECK_STATS, data, Consts.cache.GLOBAL_TTL);

        await FeedService.publish("brubeckStat", `BRUBECK INFO | Latest reward-code : ${data.lastCode}`);
        await FeedService.publish("brubeckStat", `BRUBECK INFO | 24H-DATA-STAKED : ${data.apy["24h-data-staked"]} DATA$`);

        return {
            status: 200,
            body: data
        };
    }

}