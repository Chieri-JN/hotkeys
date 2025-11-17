<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
<!--	<link rel="icon" href={favicon} />-->
	<link rel="stylesheet" href="https://use.typekit.net/cfe6wef.css">
	<link rel="stylesheet" href="https://use.typekit.net/cfe6wef.css">
</svelte:head>

<h1 class="title"><span class="hot">Hot</span>KEYS</h1>
<!--<p>Heat Map of your keystrokes</p>-->

<style>
	.title {
		font-size: 3rem;
		padding-left: 3em;
		/*font-weight: bold;*/
		font-family: "redonda", sans-serif;
		font-weight: 800;
		font-style: italic;
	}

	.hot {
		color: red;
		font-weight: 900;
		text-transform: uppercase;

	}

	p {
		font-family: "neue-haas-grotesk-display", sans-serif;
		font-weight: 500;
		font-style: normal;
	}
</style>

{@render children?.()}
