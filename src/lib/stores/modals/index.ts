import { writable } from "svelte/store";

export const modals = writable({
  isModalOpen: false,
  selected: null,
  payouts: [],
  component: null,
});
