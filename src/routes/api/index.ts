async function getPrices() {
    const BINANCE_BASE =
        "https://api.binance.com/api/v3/ticker/price?symbol=";

    const symbols = ["DATAUSDT", "BTCUSDT", "ETHUSDT", "QNTUSDT", "SOLUSDT", "MATICUSDT"];

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

    return prices;
}

async function getBrubeck() {
    const URLS = ["https://brubeck1.streamr.network:3013/apy", "https://brubeck1.streamr.network:3013/stats"]

    const requests = URLS.map(async (url) => {
        const request = await fetch(url);
        return request;
    })

    const responses = await Promise.all(requests);

    const data = await Promise.all(responses.map(res => res.json()));

    return {
        apy: data[0],
        lastRewards: data[1].lastRewards.reverse()
    };
}

export async function get() {
    const prices = await getPrices();
    const brubeck = await getBrubeck();

    return {
        status: 200,
        body: {
            prices: prices,
            brubeck: brubeck
        }
    }
}