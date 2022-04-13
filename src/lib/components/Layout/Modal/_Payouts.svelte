<script lang="ts">
  import { modals } from "$lib/stores/modals";
</script>

<div class="module">
  <h3>Payouts</h3>
  <article>
    <div>Date</div>
    <div>Amount Received</div>
  </article>
  {#each $modals.payouts as payout}
    <article>
      <div>
        {new Date(payout.timestamp * 1000).toLocaleDateString()}
        {new Date(payout.timestamp * 1000).toLocaleTimeString()}
      </div>
      <div>{payout.value} <span>DATA</span></div>
    </article>
  {/each}
</div>

<style lang="scss">
  .module {
    width: 100%;
    box-shadow: 0;
  }

  h3 {
    font-size: 26px;
  }

  article {
    display: flex;
    justify-content: space-between;
    font-size: 22px;
  }

  span {
    color: var(--color-orange);
  }
</style>
