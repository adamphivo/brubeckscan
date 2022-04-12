import Consts from "$lib/consts";

export async function getStats(address: string) {
  const url = Consts.urls.BRUBECK_NODE_STATS_BASE;
  return await fetch(`${url}${address}`);
}
