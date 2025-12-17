<script lang="ts">
    let {weight = 800, isStatic=true, size=1} : {weight : string, isStatic: boolean, size : number} = $props();

</script>


<div class="titleKard">
    <h1 class="title" style="--weight: {weight.toString()}; --size:{size.toString() +"em"}"><span class="hot">HOT</span>KEYS</h1>
    
</div>

<style>
    .title {
        font-size: var(--size);
		padding-left: 0.25em;
		font-weight: var(--weight);
		font-family: "redonda", sans-serif;
		font-style: italic;
    }
    .hot {
		color: red;
		font-weight: 900;
		text-transform: uppercase;

	}
</style>