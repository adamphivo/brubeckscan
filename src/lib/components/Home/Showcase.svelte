<script lang="ts">
  import Connect from "$lib/components/Auth/Connect.svelte";
  import overview from "$lib/assets/screens/overview.png";
</script>

<section>
  <p>
    <span>Try out</span>
    <span>new</span>
    <span>monitoring tools</span>
  </p>
  <span>
    <Connect />
  </span>
  <div style:background-image="url({overview})" />
</section>

<style lang="scss">
  section {
    width: 100%;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    div {
      width: 100%;
      height: 500px;
      background-position: top left;
      background-size: cover;
      position: relative;
      transform: rotateY(20deg) rotateX(20deg);
      border-radius: 5px;
      margin-top: 50px;
      margin-bottom: 50px;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(
          -10deg,
          var(--color-black) 20%,
          rgba(121, 0, 255, 0) 80%
        );
        width: 100%;
        height: 100%;
      }
    }
    p {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 30px;
      span {
        font-size: 36px;
        line-height: 45px;
      }
    }
  }

  @media (max-width: 1200px) {
    div {
      transform: unset;
      background-size: cover;
      background-position: center left;
      height: 250px;
    }
    section {
      width: 100%;
      display: none;
      p {
        span {
          font-size: 22px;
        }
      }
    }
  }
</style>
