<script lang="ts">
  import { get } from "svelte/store";
  import type { Writable } from "svelte/store";

  export let store: Writable<string>;

  const currencies = ["data", "usdt", "eur"];
</script>

<div>
  {#each currencies as currency}
    <button
      on:click|preventDefault={() => store.set(currency)}
      class="{$store === currency ? 'active' : ''} {currency}"
    >
      {currency}
    </button>
  {/each}
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: row;
    gap: 10px;
    button {
      text-transform: uppercase;
    }
  }

  .active {
    &.data {
      color: var(--color-orange);
    }
    &.usdt {
      color: var(--color-usdt);
    }
    &.eur {
      color: var(--color-eur);
    }
  }
</style>
