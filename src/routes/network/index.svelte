<script lang="ts" context="module">
</script>

<script lang="ts">
    import Topology from "$lib/components/Brubeck/graphs/_Topology.svelte";
    import MissedClaims from "$lib/components/Brubeck/graphs/_MissedClaims.svelte";
    import MeanPropagationDelays from "$lib/components/Brubeck/graphs/_MeanPropagationDelays.svelte";
    import PageTitle from "$lib/components/Layout/PageTitle.svelte";

    const TITLE = "Network";
</script>

<section class="modulePool">
    <PageTitle title={TITLE} />
    <Topology />
    <MissedClaims />
    <MeanPropagationDelays />
</section>
