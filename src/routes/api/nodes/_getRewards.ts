import Consts from "$lib/consts";

export async function getRewards(address: string) {
  const url = Consts.urls.BRUBECK_NODE_REWARDS_BASE;
  return await fetch(`${url}${address}`);
}
