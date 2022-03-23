import { userData, watchListData } from "$lib/stores/userData";
import { scannedNodeData } from "$lib/stores/scannedNodeData";

export function clearAuthSession() {
    userData.update(item => null);
    watchListData.update(item => null);
    scannedNodeData.update(item => null);
}