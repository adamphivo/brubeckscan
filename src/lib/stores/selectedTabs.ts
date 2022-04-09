import { writable } from "svelte/store";
import Feed from "$lib/components/Streams/Feed/Feed.svelte";
import Chat from "$lib/components/Streams/Chat/Chat.svelte";
import Overview from "$lib/components/Watchlist/Overview/Overview.svelte";
import List from "$lib/components/Watchlist/List/List.svelte";

export const streamTabs = writable({
  selected: Feed,
  available: [
    { name: "Feed", component: Feed },
    { name: "Chat", component: Chat },
  ],
});

export const watchlistTabs = writable({
    selected: Overview,
    available: [
        { name: "Overview", component: Overview},
        { name: "Nodes", component: List}
    ]
});
