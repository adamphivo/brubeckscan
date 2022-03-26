<script lang="ts">
    import PageTitle from "$lib/components/Layout/PageTitle.svelte";
    import ApyApr from "$lib/components/Brubeck/ApyApr.svelte";
    import Prices from "$lib/components/Markets/Prices.svelte";
    import TotalDataStaked from "$lib/components/Brubeck/graphs/_DataStaked.svelte";

    const TITLE = "Home";
</script>

<section class="modulePool">
    <PageTitle title={TITLE} />
    <Prices />
    <ApyApr />
    <TotalDataStaked />
</section>
