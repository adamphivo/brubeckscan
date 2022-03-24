import { marketPrices } from "$lib/stores/marketPrices";
import { send } from "$lib/helpers/send";

export async function updateMarketPrices() {
    const updatedMarketPrices = await send("GET", "market/prices.json").then(
        (r) => r.json()
    );

    marketPrices.set(updatedMarketPrices);
}