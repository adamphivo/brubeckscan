import { send } from "$lib/helpers/send";
import BrubeckStatsDAO from "$lib/dao/brubeckStats";

export async function saveBrubeckStats() {
    const response = await send("GET", "brubeckStats.json");
    const data = await response.json();
    const brubeckStats = await BrubeckStatsDAO.save(data);
    return brubeckStats;
}