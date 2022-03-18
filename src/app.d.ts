/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	interface Locals { }
	interface Platform { }
	interface Session {
		hasProvider: boolean | undefined;
		selectedAddress: null | string;
		user: any;
		prices: any;
	}
	interface Stuff { }
}

declare interface Window {
	ethereum: any;
}