<script lang="ts">
    import Connect from "$lib/components/auth/Connect.svelte";
</script>

<div class="container">
    <nav>
        <h1>Streamr Dashboard</h1>
        <Connect />
    </nav>
</div>

<style lang="scss">
    .container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid gray;
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            width: 100%;
            max-width: var(--site-max-width);
            height: 50px;
        }
    }
</style>
