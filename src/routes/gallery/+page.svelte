<script lang="ts">
    import GalleryDataset from "$lib/galleryDataset.svelte";
    import { sampleData } from "../../lib/constants";
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

        article {
            /*display: grid;  */
            display: grid;
            grid-template-rows: subgrid;
            grid-row: span 3;
        }
        h2 {
            margin: 0;
        }

        h1, h2, h3, h4, h5, h6 {
            line-height: 1.1;
            text-wrap: balance;
        }

        h1 {
            font-size: 400%;
        }
    }
</style>