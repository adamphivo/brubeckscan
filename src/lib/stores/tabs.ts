import { writable } from "svelte/store";
import Feed from "$lib/components/Streams/Feed/Feed.svelte";
import Chat from "$lib/components/Streams/Chat/Chat.svelte";
import Overview from "$lib/components/Watchlist/Overview/Overview.svelte";
import List from "$lib/components/Watchlist/List/List.svelte";
import Map from "$lib/components/Streams/Map/Map.svelte";
import Logs from "$lib/components/Streams/Logs/Logs.svelte";

export const streamTabs = writable({
  selected: Feed,
  available: [
    { name: "Feed", component: Feed },
    { name: "Chat", component: Chat },
    { name: "Map", component: Map },
    { name: "Logs", component: Logs },
  ],
});

export const watchlistTabs = writable({
  selected: Overview,
  available: [
    { name: "Overview", component: Overview },
    { name: "Nodes", component: List },
  ],
});
