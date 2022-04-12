import { userData } from "$lib/stores/user";
import { nodesData } from "$lib/stores/nodes";
import { scannedNodeData } from "$lib/stores/scannedNodeData";

export function clearAuthSession() {
    userData.set(null);
    nodesData.set(null);
    scannedNodeData.set(null);
}