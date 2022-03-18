<script lang="ts" context="module">
    export async function load({ fetch }) {
        const res = await fetch("https://brubeck1.streamr.network:3013/apy");
        if (res.ok) {
            const apyapr = await res.json();
            if (apyapr) {
                return {
                    props: {
                        apyapr: apyapr,
                    },
                };
            } else {
                return {};
            }
        }
        return {};
    }
</script>

<script lang="ts">
    import ApyApr from "$lib/components/streamr/ApyApr.svelte";
    import Market from "$lib/components/market/Market.svelte";
    export let apyapr;
</script>

<section>
    <ApyApr data={apyapr} />
    <div class="test"></div>
    <Market />
</section>

<style lang="scss">
    section {
        width: 100%;
        max-width: var(--site-max-width);
        display: flex;
        justify-content: space-between;
        gap: 30px;
    }

    .test {
        flex-grow: 1;
        background-color: rgb(48, 43, 43);
        border:1px solid rgb(231, 231, 231);
        border-radius: 5px;
    }
</style>
