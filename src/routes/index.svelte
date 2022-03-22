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
