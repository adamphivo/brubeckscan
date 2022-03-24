import { userData, watchListData } from "$lib/stores/userData";
import { scannedNodeData } from "$lib/stores/scannedNodeData";

export function clearAuthSession() {
    userData.set(null);
    watchListData.set(null);
    scannedNodeData.set(null);
}