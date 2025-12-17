<script lang="ts">
    import GalleryDataset from "$lib/GalleryDataset.svelte";
    import { sampleData  } from "../../lib/dataConstants";
</script>

<h1>Gallery</h1>

<div class="gallery">
    {#each Array.from({ length: 3 }) as _, i}
        <GalleryDataset dataSetName={i.toString()} data={{text: "", words : [""], freq:{"" : 0}, keyFreq: {[`Digit${i}`] : 20}}} />
    {/each}

    <GalleryDataset dataSetName={"Sample data"} data={sampleData} />
</div>


<style>

    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(15em, 20em));
        grid-template-rows : subgrid;
            gap: 5em;
            align-items: start;
            grid-auto-rows: min-content;


    }
</style>