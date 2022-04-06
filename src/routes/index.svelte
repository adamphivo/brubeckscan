<script lang="ts">
    import TotalDataStaked from "$lib/components/Brubeck/Graphs/_DataStaked.svelte";
    import Presentation from "$lib/components/Brubeck/Presentation.svelte";
    import Run from "$lib/components/Brubeck/Run.svelte";
    import Apy from "$lib/components/Brubeck/Apy.svelte";
</script>

<section class="modulePool">
    <Run />
    <Presentation />
    <TotalDataStaked />
    <Apy />
</section>

<style lang="scss">
    .modulePool {
        gap: 50px;
    }
</style>
