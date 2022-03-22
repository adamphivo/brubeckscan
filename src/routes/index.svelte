<script lang="ts" context="module">
    import StateService from "$lib/services/state";

    export async function load() {
        await StateService.updateMarketPrices();
        return {};
    }
</script>

<script lang="ts">
    import PageTitle from "$lib/modules/Layout/Page/PageTitle.svelte";
    import ApyApr from "$lib/modules/Brubeck/ApyApr.svelte";
    import Prices from "$lib/modules/Markets/Prices.svelte";

    const TITLE = "Home";
</script>

<section class="modulePool">
    <PageTitle title={TITLE}/>
    <Prices />
    <ApyApr />
</section>
