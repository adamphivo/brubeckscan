<script lang="ts">
    import Run from "$lib/components/Home/Run.svelte";
    import Presentation from "$lib/components/Home/Presentation.svelte";
    import TotalDataStaked from "$lib/components/Brubeck/Graphs/_DataStaked.svelte";
    import Apy from "$lib/components/Home/Apy.svelte";
    import Showcase from "$lib/components/Home/Showcase.svelte";
</script>

<section class="modulePool">
    <div>
        <Run />
        <Presentation />
    </div>
    <TotalDataStaked />
    <Apy />
    <Showcase />
</section>

<style lang="scss">
    .modulePool {
        gap: 50px;
    }

    div {
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    @media (max-width: 1200px) {
        .modulePool {
            gap: 30px;
        }

        div {
            flex-direction: column-reverse;
        }
    }
</style>
