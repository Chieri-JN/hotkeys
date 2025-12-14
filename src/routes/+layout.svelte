<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { goto } from '$app/navigation';
	import { showLayout } from '$lib/stores.js';
	import Title from '$lib/title.svelte';
	let selected = '/';

	function handleChange(event) {
		const value = event.target.value;
		selected = value;
		goto(value);     // navigate to selected route
	}
	let { children } = $props();
</script>

<svelte:head>
<!--	<link rel="icon" href={favicon} />-->
	<link rel="stylesheet" href="https://use.typekit.net/cfe6wef.css">
	<link rel="stylesheet" href="https://use.typekit.net/cfe6wef.css">
</svelte:head>


{#if $showLayout}
	<nav>
		<Title weight={500} size={1.5}/>
<!--		<label>-->
<!--			<input type="radio" name="page" value="/" onchange={handleChange} />-->
<!--			<p2>Interactive</p2>-->
<!--		</label>-->

<!--		<label>-->
<!--			<input type="radio" name="page" value="/gallery" onchange={handleChange} />-->
<!--			<p2>Gallery</p2>-->
<!--		</label>-->
	</nav>
	<!--<p>Heat Map of your keystrokes</p>-->
{/if}

<style>
	nav {
		.title {
		font-size: 3rem;
		padding-left: 0.25em;
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
	}
	

	p2 {
		font-family: "neue-haas-grotesk-display", sans-serif;
		font-weight: 500;
		font-style: normal;
	}


</style>

{@render children?.()}
