<script lang="ts">
    import Topology from "$lib/components/Brubeck/Graphs/_Topology.svelte";
    import MissedClaims from "$lib/components/Brubeck/Graphs/_MissedClaims.svelte";
    import MeanPropagationDelays from "$lib/components/Brubeck/Graphs/_MeanPropagationDelays.svelte";
</script>

<section class="modulePool">
    <Topology />
    <MissedClaims />
    <MeanPropagationDelays />
</section>
