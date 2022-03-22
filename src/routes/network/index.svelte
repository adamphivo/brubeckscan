<script lang="ts" context="module">
</script>

<script lang="ts">
    import Topology from "$lib/modules/Brubeck/graphs/_Topology.svelte";
    import MissedClaims from "$lib/modules/Brubeck/graphs/_MissedClaims.svelte";
    import MeanPropagationDelays from "$lib/modules/Brubeck/graphs/_MeanPropagationDelays.svelte";
    import PageTitle from "$lib/modules/Layout/Page/PageTitle.svelte";

    const TITLE = "Network";
</script>

<section class="modulePool">
    <PageTitle title={TITLE} />
    <Topology />
    <MissedClaims />
    <MeanPropagationDelays />
</section>
