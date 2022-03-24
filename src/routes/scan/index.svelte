<script lang="ts" context="module">
    import StateService from "$lib/services/state";

    export async function load() {
        await StateService.updateMarketPrices();
        return {};
    }
</script>

<script lang="ts">
    import Scan from "$lib/components/Node/Scan.svelte";
    import PageTitle from "$lib/components/Layout/PageTitle.svelte";
    const TITLE = "Scan";
</script>

<div class="modulePool">
    <PageTitle title={TITLE}/>
    <Scan />
</div>

<style lang="scss"></style>
