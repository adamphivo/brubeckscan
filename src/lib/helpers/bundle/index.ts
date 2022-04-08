import { browser } from "$app/env";
import UserService from "$lib/services/user";
import StateService from "$lib/services/state";
import StreamService from "$lib/services/stream";
import { hasEthereum } from "$lib/stores/userData";
import { attachEvents } from "./_attachEvents";
import { loadingStatus } from "$lib/stores/loadingStatus";

export async function bundle() {
    if (browser) {
        loadingStatus.set('Fetching market prices')
        await StateService.updateMarketPrices();
        loadingStatus.set('Fetching BrubeckStats')
        await StateService.updateBrubeckStats();
        loadingStatus.set('Gathering data history')
        await StateService.setBrubeckHistory();
        loadingStatus.set('Setting Streamr client up')
        await StreamService.bundle();

        if (window as any) {
            if (typeof (window as any).ethereum === "undefined") {
                return (hasEthereum.set(false));
            }
            
            hasEthereum.set(true);

            if ((window as any).ethereum.selectedAddress) {
                await UserService.login((window as any).ethereum.selectedAddress);
            }

            await attachEvents();
        }
    }
}