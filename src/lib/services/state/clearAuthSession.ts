import { userData, userDataComputed } from "$lib/stores/userData";
import { scannedNodeData } from "$lib/stores/scannedNodeData";

export function clearAuthSession() {
    userData.update(item => null);
    userDataComputed.update(item => null);
    scannedNodeData.update(item => null);
}