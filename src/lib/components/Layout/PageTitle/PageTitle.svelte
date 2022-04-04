<script lang="ts">
    import { page } from "$app/stores";
    export let secondaryTitle = null;
</script>

<div class="module">
    <h2>{$page.routeId || "BrubeckScan"} <span>{secondaryTitle ? secondaryTitle : ""}</span></h2>
</div>

<style lang="scss">
    .module {
        width: 100%;
        background-color: rgb(240, 229, 229);
        padding: 15px 30px;
        border-radius: 0;
        color: var(--color-black);
        font-size: 28px;
        border-bottom: 2px solid var(--color-orange);
        max-width: 1300px;
    }

    h2 {
        text-transform: capitalize;
    }

    span {
        color: rgb(86, 96, 97);
    }
</style>
