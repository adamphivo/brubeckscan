import { appCache } from "$lib/helpers/cache";
import Consts from "$lib/consts";

export async function get() {
    const cached = appCache.get(Consts.cache.BRUBECK_STATS);

    if (cached) {
        return {
            body: cached
        }
    } else {
        const urls = [Consts.urls.BRUBECK_APY, Consts.urls.BRUBECK_STATS];

        const requests = urls.map(async (url) => {
            const request = await fetch(url);
            return request;
        })

        const responses = await Promise.all(requests);

        const [apy, lastRewards] = await Promise.all(responses.map(res => res.json()));

        const data = {
            apy,
            lastRewards: lastRewards.lastRewards.reverse(),
            lastCode: lastRewards.lastRewards.at(-1).code
        };

        const save = appCache.set(Consts.cache.BRUBECK_STATS, data, Consts.cache.TTL);

        return {
            status: 200,
            body: data
        }
    }

}