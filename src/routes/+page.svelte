<script lang="ts">

    import Keyboard from "$lib/Keyboard.svelte";
    import KeyGraph from  "$lib/KeyGraph.svelte"
    import { parseData } from "../lib/dataProcessor.js";
    import {fillerKeyType, views} from "../lib/constants.js"

    // import {keyType} from "$lib/types";
    let selectedView = $state("live");
    let isStatic = $state(false);
    let allowCooling = $state(false);
    let selectedKeys = $state([fillerKeyType, fillerKeyType, fillerKeyType]);
    import type { keyType } from "../lib/types";

    function selectedKey (keys : keyType[]) {
        // selectedChar = key.char
        selectedKeys = keys
    }

    let loadedData  = $state(null);


</script>
<div class="options">

    <label>
        Select a view
        <select class="selection" bind:value={selectedView}>
            Select a View
            {#each views as v}
                <option value={v.id}>
                    {v.name}
                </option>
            {/each}
        </select>
    </label>
</div>
<div class="main">
    <div class="sliderSpace">
        <input class="timeSlider" type="range" name="slider" min="0" max="100" >
    </div>
    {#if selectedView==="live"}

        <div >
            <div class="allContent">
                {#each selectedKeys as sKeys}
                    {#if sKeys}
                        <div class="keyGraph">
                            <KeyGraph data={{text: "", words : [""]}}  chosenKey={sKeys.char} code={sKeys.char} count={0}/>
                        </div>
                    {/if}

                {/each}

            </div>
            <div class="cooler">
                <input type="checkbox" bind:checked={allowCooling}>
                Allow Cooling
            </div>
            <div class="keyboard">
                <Keyboard name={"name"} selectKeys={selectedKey} isStatic={isStatic} allowCooling={allowCooling}/>
            </div>
        </div>

    {:else if selectedView==="justTyping"}
        <div class="cooler">
            <input type="checkbox" bind:checked={allowCooling}>
            Allow Cooling
        </div>

        <div class="keyboard">
            <Keyboard name={"name"} selectKeys={selectedKey} isStatic={isStatic} allowCooling={allowCooling}/>
        </div>
    {:else if selectedView==="gallerySelection"}
        <h2>Select one of the Gallery texts!</h2>
    {:else if selectedView==="upload"}
        <h2>Upload a text file!</h2>
        {#await loadedData}
            <p>loading data...</p>
        {:then data}
            <p>loaded data!</p>
        {:catch error}
            <p>Something went wrong: {error.message}</p>
        {/await}
    {/if}
</div>

<!--<h1 class = "selection" style = "padding-left: 4.5em">Select Views</h1>-->
<!--<input type="">-->




<style>

    .options {
        display: flex;
        padding-top: 1em;
        justify-content: flex-start;
        align-items: center;
        /*align-content: center;*/
    }
    .keyboard {
        width: 100vw;
        display: flex;
        justify-content: center;
        /*padding-top: 1em;*/
    }
    .allContent{
        width: 100vw;
        display: flex;
        justify-content: center;
    }
    .selection {
        /*font-family: "neue-haas-grotesk-display", sans-serif;*/
        /*font-weight: 600;*/
        /*font-style: normal;*/
        /*padding: 1em;*/
    }

    .keyGraph {
        padding-left: 0.85em;
        padding-right: 0.85em;
        padding-bottom: 1em;
    }
    .timeSlider {
        /*justify-content: center;*/
        /*width: 80vw;*/
        /*padding-left: 5em;*/
        width: 80vw;
        max-width: 1200px;
        background: #000;
    }
    .sliderSpace {
        width: 100vw;
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
    }

    .main {
        justify-content: center;
        /*display: inline-flex;*/
    }
    .cooler {
        padding-left: 10em;
        padding-right: 5em;
        /*padding-top: 1em;*/
        /*justify-content: center;*/
    }

</style>

