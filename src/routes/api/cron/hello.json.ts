import StreamService from "$lib/services/stream";
import { send } from "$lib/helpers/send";

export async function get() {
    // Hello
    await StreamService.feedStream.publish("hello", "Welcome and thank you for using BrubeckScan ✨");

    // Prices
    const pricesRequest = await send("GET", "market/prices.json");
    const prices = await pricesRequest.json();
    await StreamService.feedStream.publish("prices", `DATAUSDT : ${prices["DATAUSDT"]} USDT 📈`);
    await StreamService.feedStream.publish("prices", `BTCUSDT : ${prices["BTCUSDT"]} USDT 📈`);

    // BrubeckStats
    const brubeckRequest = await send("GET", "brubeck/stats.json");
    const brubeckStats = await brubeckRequest.json();
    await StreamService.feedStream.publish("brubeckStat", `BRUBECK INFO | Latest reward code : ${brubeckStats.lastCode} ✅`);
    await StreamService.feedStream.publish("brubeckStat", `BRUBECK INFO | Current APY : ${brubeckStats.apy["24h-APY"]} % ✅`);

    // AppUsers
    const countUsersRequest = await send("GET", "users.json");
    const countUsers = await countUsersRequest.json();
    await StreamService.feedStream.publish("brubeckScanStat", `BRUBECKSCAN STAT | Users : ${countUsers.countUsers} 👥`);

    return {
        status: 200,
        body: {}
    };
}