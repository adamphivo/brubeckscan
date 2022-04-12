import { derived, writable } from "svelte/store";
import { getTotals } from "$lib/services/watchlist/getTotals";

export const nodesData = writable(null as any);

export const nodesDataTotals = derived(nodesData, (nodesData) => {
  if (!nodesData) return null;

  if (nodesData.length === 0) return null;

  const totals = getTotals(nodesData);

  return totals;
});
