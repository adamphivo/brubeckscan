import { writable } from "svelte/store";
import MdHome from "svelte-icons/md/MdHome.svelte";
import MdPoll from "svelte-icons/md/MdPoll.svelte";
import MdSearch from "svelte-icons/md/MdSearch.svelte";
import MdLeakAdd from "svelte-icons/md/MdLeakAdd.svelte";

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
    icon: MdLeakAdd,
    title: "Streams",
  },
];

export const links = writable(pages);
