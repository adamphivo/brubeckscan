<script lang="ts" context="module">
</script>

<script lang="ts">
    import { session } from "$app/stores";
    import ApyApr from "$lib/components/modules/Brubeck/ApyApr.svelte";
    import Prices from "$lib/components/modules/Markets/Prices.svelte";
    import User from "$lib/components/modules/AuthFlow/User.svelte";
    import Node from "$lib/components/modules/Node/Node.svelte";
</script>

<section class="modulePool">
    <ApyApr />
    <Prices />
    {#if $session.user}
        <User mode="module" />
        <Node address={$session.user.address} />
    {:else}
        <User mode="noUser" />
    {/if}
</section>
