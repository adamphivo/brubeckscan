<script lang="ts">
    import Connect from "$lib/components/Layout/Header/_Connect.svelte";
    import overviewImage from "$lib/assets/screens/overview.png";
</script>

<div class="module">
    <img src={overviewImage} alt="A screen of the overview module" />
    <div class="text">
        <p>
            Monitoring tools for node runners
        </p>
        <Connect />
    </div>
</div>

<style lang="scss">
    .module {
        background-color: transparent;
        padding: 0;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        margin-top: 100px;
    }

    .text {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: 800;
        gap: 50px;  
    }

    img {
        width: 700px;
        transform:  rotateX(-8deg) rotateY(39deg) rotateZ(0deg);
        transition-duration: 0.3s;
    }
</style>
