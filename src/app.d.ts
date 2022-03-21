/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	// interface Locals { }
	// interface Platform { }
	interface Session {
		user: any;
		prices: any;
		brubeck: any;
		currentList: any;
	}
	// interface Stuff { }
}

declare interface Window {
	ethereum: any;
}