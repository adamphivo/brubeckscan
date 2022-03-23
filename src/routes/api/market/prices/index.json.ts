import { appCache } from "$lib/helpers/cache";

export async function get() {
    const cached = appCache.get("marketPrices")

    if (cached) {
        return {
            body: cached
        }
    } else {
        const BINANCE_BASE =
            "https://api.binance.com/api/v3/ticker/price?symbol=";
    
        const symbols = ["BTCUSDT", "DATAUSDT"];
    
        const requests = symbols.map(async (symbol) => {
            const request = await fetch(`${BINANCE_BASE}${symbol}`)
            return request;
        });
    
        const responses = await Promise.all(requests);
    
        const data = await Promise.all(responses.map((res) => res.json()));
    
        let prices: any = {}
    
        data.forEach(price => {
            prices[price.symbol] = price.price
        })
    
        const save = appCache.set("marketPrices", prices, 60);
    
        return {
            status: 200,
            body: prices,
            maxage: 60
        };
    }

}