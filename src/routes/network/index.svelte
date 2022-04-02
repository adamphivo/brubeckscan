<script lang="ts">
    import Topology from "$lib/components/Brubeck/graphs/_Topology.svelte";
    import MissedClaims from "$lib/components/Brubeck/graphs/_MissedClaims.svelte";
    import MeanPropagationDelays from "$lib/components/Brubeck/graphs/_MeanPropagationDelays.svelte";
</script>

<section class="modulePool">
    <Topology />
    <MissedClaims />
    <MeanPropagationDelays />
</section>
