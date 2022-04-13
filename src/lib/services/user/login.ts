import { send } from "$lib/helpers/send";
import { userData, anonymousUserUid } from "$lib/stores/user";
import { nodesData } from "$lib/stores/nodes";
import { scannedNodeData } from "$lib/stores/scannedNodeData";
import UserService from "$lib/services/user";

export async function login(
  address: any,
  triggerScannedNodeUpdate: boolean = true
) {
  const response = await send("PATCH", `users/${address}.json`);

  const user = await response.json();

  if (user) {
    userData.set(user);
    anonymousUserUid.set("");
    const nodes = await UserService.processNodes(user.nodes);
    if (nodes) {
      nodesData.set(nodes);
      if (triggerScannedNodeUpdate) {
        scannedNodeData.set(
          nodes.find((node) => node.address === user.address)
        );
      }
    }
  }

  return user;
}
