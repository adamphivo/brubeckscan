<script lang="ts">
    import TotalDataStaked from "$lib/components/Brubeck/Graphs/_DataStaked.svelte";
    import Presentation from "$lib/components/Brubeck/Presentation.svelte";
    import Network from "$lib/components/Branding/Illustrations/Network.svelte";
    import CallToConnect from "$lib/components/Brubeck/CallToConnect.svelte";
</script>

<section class="modulePool">
    <Presentation />
    <TotalDataStaked />
    <Network />
    <CallToConnect />
</section>

<style lang="scss">
    .modulePool {
        gap: 100px;
    }
</style>
