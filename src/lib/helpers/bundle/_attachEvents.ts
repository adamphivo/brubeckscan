
import { goto } from "$app/navigation";
import UserService from "$lib/services/user";
import StateService from "$lib/services/state";
import Consts from "$lib/consts";

export async function attachEvents() {
    (window as any).ethereum.on(Consts.events.MM_DISCONNECT, onDisconnect);
    (window as any).ethereum.on(Consts.events.MM_ACCOUNTS_CHANGED, onAccountsChanged);
}

async function onDisconnect(error: any) {
    StateService.clearAuthSession();
    console.log(error);
    goto("/");
}

async function onAccountsChanged(accounts: any) {
    if (accounts.length > 0) {
        await UserService.login(accounts[0]);
    } else {
        StateService.clearAuthSession();
        goto("/");
    }
}