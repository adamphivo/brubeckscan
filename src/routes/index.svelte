<script lang="ts">
    import TotalDataStaked from "$lib/components/Brubeck/graphs/_DataStaked.svelte";
    import Presentation from "$lib/components/Brubeck/Presentation.svelte";
    import Apy from "$lib/components/Brubeck/Apy.svelte";
    import Network from "$lib/components/Brubeck/images/network.svelte";
</script>

<section class="modulePool">
    <Presentation />
    <TotalDataStaked />
    <Network />
    <!-- <Apy /> -->
</section>

<style lang="scss">
</style>
