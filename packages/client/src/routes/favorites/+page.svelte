<script lang="ts">
	import { user } from '$lib/stores';
	import Favorite from '$lib/components/Favorites/Favorite.svelte';
	import Totals from '$lib/components/Favorites/Totals.svelte';
	import Doughnut from '$lib/components/Favorites/Doughnut.svelte';
	import Add from '$lib/components/Favorites/Add.svelte';
	import SelectCurrency from '$lib/components/Favorites/SelectCurrency.svelte';
	import Module from '$lib/components/Module.svelte';
</script>

<svelte:head>
	<title>BrubeckScan | Favorites</title>
</svelte:head>

{#if $user}
	<div class="flex w-full max-w-screen-lg flex-col items-stretch gap-8 px-4 pb-20 pt-10">
		<div class="sticky top-0 flex">
			<Add />
		</div>
		{#if $user.Favorite.length}
			<div class="flex w-full justify-between">
				<SelectCurrency />
			</div>
			<div class="flex w-full max-w-screen-lg flex-wrap items-stretch gap-8 md:flex-nowrap">
				<div class="flex w-full md:w-4/6">
					<Totals />
				</div>
				<div class="flex w-full md:w-2/6">
					<Doughnut />
				</div>
			</div>
		{/if}
		<div class="flex flex-row flex-wrap justify-between gap-4">
			{#each $user.Favorite as favorite (favorite.id)}
				<div class="node flex w-full">
					<Favorite {favorite} />
				</div>
			{/each}
		</div>
	</div>
{:else}
	<div class="flex w-full max-w-screen-lg flex-col items-stretch gap-8 pb-20 pt-10">
		<Module>
			<p class="w-full text-center text-xl text-neutral-500">
				<span>Connect to start saving your nodes and keep track of your rewards 🎉</span>
			</p>
		</Module>
	</div>
{/if}

<style>
	.node {
		max-width: calc(50% - 8px);
	}
	@media (max-width: 1025px) {
		.node {
			max-width: unset;
		}
	}
</style>
