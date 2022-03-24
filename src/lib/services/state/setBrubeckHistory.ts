import { send } from "$lib/helpers/send";
import { brubeckDataHistory } from "$lib/stores/brubeckData";

export async function setBrubeckHistory() {
    const response = await send('GET', 'brubeck/stats/history.json');

    if (response.ok) {
        const data = await response.json();
        brubeckDataHistory.set(data.data.brubeckStats);
    }
}