<script lang="ts">
    import Topology from "$lib/components/Brubeck/Graphs/_Topology.svelte";
    import MissedClaims from "$lib/components/Brubeck/Graphs/_MissedClaims.svelte";
    import MeanPropagationDelays from "$lib/components/Brubeck/Graphs/_MeanPropagationDelays.svelte";
</script>

<section class="modulePool">
    <div class="module">
        <p>Each tick of those charts represents one of the latest 100 reward codes delivered to the network</p>
    </div>
    <Topology />
    <MissedClaims />
    <MeanPropagationDelays />
</section>

<style lang="scss">
    .module {
        width: 100%;
    }
    p {
        font-size: 16px;
        font-weight: 500;
    }
</style>
