<script lang="ts">
    import { session } from "$app/stores";
    import ApyApr from "$lib/components/modules/Brubeck/ApyApr.svelte";
    import Market from "$lib/components/modules/Markets/Market.svelte";
    import User from "$lib/components/modules/AuthFlow/User.svelte";
</script>

<!-- Pages are actually more like modules pool -->
<section class="modulePool">
    {#if $session.user}
        <User mode="module" />
    {:else}
        <User mode="noUser" />
    {/if}
    <ApyApr />
    <Market />
</section>
