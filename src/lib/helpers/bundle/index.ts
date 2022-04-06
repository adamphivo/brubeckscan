import { browser } from "$app/env";
import UserService from "$lib/services/user";
import StateService from "$lib/services/state";
import { hasEthereum } from "$lib/stores/userData";
import { attachEvents } from "./_attachEvents";

export async function bundle() {
    if (browser) {
        await StateService.updateMarketPrices();
        await StateService.updateBrubeckStats();
        await StateService.setBrubeckHistory();

        if (window as any) {
            if (typeof (window as any).ethereum === "undefined") {
                return (hasEthereum.set(false));
            }
            
            hasEthereum.set(true);

            if ((window as any).ethereum.selectedAddress) {
                console.log((window as any).ethereum.selectedAddress);
                await UserService.login((window as any).ethereum.selectedAddress);
            }

            await attachEvents();
        }
    }
}