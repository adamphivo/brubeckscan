import { send } from "$lib/helpers/send";
import { brubeckData } from "$lib/stores/brubeckData";

export async function updateBrubeckStats() {
    const brubeckStats = await send("GET", "brubeckStats.json").then(
        (r) => r.json()
    );

    brubeckData.set(brubeckStats);
}