import FeedService from "$lib/services/feeds";
import { send } from "$lib/helpers/send";

export async function get() {
    // Hello
    await FeedService.publish("hello", "Welcome and thank you for using BrubeckScan ✨");

    // Prices
    const pricesRequest = await send("GET", "market/prices.json");
    const prices = await pricesRequest.json();
    await FeedService.publish("prices", `DATAUSDT : ${prices["DATAUSDT"]} USDT 📈`);
    await FeedService.publish("prices", `BTCUSDT : ${prices["BTCUSDT"]} USDT 📈`);

    // BrubeckStats
    const brubeckRequest = await send("GET", "brubeck/stats.json");
    const brubeckStats = await brubeckRequest.json();
    await FeedService.publish("brubeckStat", `BRUBECK INFO | Latest reward code : ${brubeckStats.lastCode} ✅`);
    await FeedService.publish("brubeckStat", `BRUBECK INFO | Current APY : ${brubeckStats.apy["24h-APY"]} % ✅`);

    return {
        status: 200,
        body: {}
    };
}