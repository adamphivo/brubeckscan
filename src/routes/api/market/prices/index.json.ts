import Consts from "$lib/consts";
import { appCache } from "$lib/helpers/cache";

export async function get() {
    const cached = appCache.get(Consts.cache.MARKET_PRICES);

    if (cached) {
        return {
            body: cached
        };
    } else {
        const requests = Consts.pairs.map(async (symbol) => {
            const request = await fetch(`${Consts.urls.BINANCE_PRICE_TICKER_BASE}${symbol}`);
            return request;
        });

        const responses = await Promise.all(requests);

        const data = await Promise.all(responses.map((res) => res.json()));

        let prices: any = {};

        data.forEach(price => {
            prices[price.symbol] = price.price;
        });

        appCache.set(Consts.cache.MARKET_PRICES, prices, Consts.cache.PRICES_TTL);

        return {
            status: 200,
            body: prices,
        };
    }

}