<script lang="ts">
  export let content;

</script>

<div style:top={content.posY} style:left={content.posX} title={content.userAddress}>
  <p style:background={content.userGradient} />
</div>

<style lang="scss">
  div {
    position: absolute;
    padding: 10px;
    transition-duration: 0.3s;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: rgb(20, 19, 19);
    }
    p {
      width: 5px;
      height: 5px;
      z-index: 2;
    }
  }
</style>
