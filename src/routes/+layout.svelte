<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { goto } from '$app/navigation';
	import { showLayout } from '$lib/stores.js';
	import Title from '$lib/Title.svelte';
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
	</nav>
{/if}

<style>



</style>

{@render children?.()}
