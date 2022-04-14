<script lang="ts">
  export let stream;
</script>

<section class="module">
  <div class="streamId">
    <p>Stream ID :</p>
    <p>{stream.getId()}</p>
  </div>
  <div class="learn">
    <a href="https://streamr.network/docs/welcome" target="_blank">
      <p>Learn more about streams</p>
    </a>
  </div>
  <div class="description">
      {stream.getDescription()}
  </div>
</section>

<style lang="scss">
  .module {
    width: 100%;
    border-radius: 0;
    margin-top: 30px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    flex-wrap: wrap;
  }
  .streamId {
    display: flex;
    gap: 20px;
    font-size: 14px;
    color: rgb(104, 104, 104);
  }

  .learn {
    font-size: 14px;
    transition-duration: 0.3s;
    color: grey;
    &:hover {
      color: whitesmoke;
    }
  }

  .description {
      width: 100%;
      font-size: 12px;
  }
</style>
