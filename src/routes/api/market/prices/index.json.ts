export async function get() {
    const BINANCE_BASE =
        "https://api.binance.com/api/v3/ticker/price?symbol=";

    const symbols = ["DATAUSDT", "BTCUSDT", "ETHUSDT"];

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

    return {
        status: 200,
        body: prices
    };
}