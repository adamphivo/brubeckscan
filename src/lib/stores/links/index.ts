import { writable } from "svelte/store";
import MdHome from "svelte-icons/md/MdHome.svelte";
import MdPoll from "svelte-icons/md/MdPoll.svelte";
import MdBookmark from "svelte-icons/md/MdBookmark.svelte";
import MdSearch from "svelte-icons/md/MdSearch.svelte";
import FaBroadcastTower from "svelte-icons/fa/FaBroadcastTower.svelte";

const pages = [
  {
    url: "/",
    icon: MdHome,
    title: "Home",
  },
  {
    url: "/network",
    icon: MdPoll,
    title: "Network charts",
  },
  {
    url: "/scan",
    icon: MdSearch,
    title: "Scan the network",
  },
  {
    url: "/streams",
    icon: FaBroadcastTower,
    title: "Streams",
  },
  {
    url: "/watchlist",
    icon: MdBookmark,
    title: "Watchlist",
  },
];

export const links = writable(pages);
