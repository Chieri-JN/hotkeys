<script lang="ts">

    import Keyboard from "$lib/Keyboard.svelte";
    import KeyGraph from  "$lib/KeyGraph.svelte"
    import {fillerKeyType} from "../lib/constants.js"

    // import {keyType} from "$lib/types";
    let selectedView = $state("text");
    let selectedChar = $state("KeyE");
    let selectedKeys = $state([fillerKeyType, fillerKeyType, fillerKeyType]);
    let selectedKeyboards = $state(new Array(4));
    import type { keyType } from "../lib/types";

    function selectedKey (keys : keyType[]) {
        // selectedChar = key.char
        selectedKeys = keys
    }



</script>


<div >
    <div class="allContent">
<!--        VIEW-->
        {#each selectedKeys as sKeys}
            {#if sKeys}
                <div class="keyGraph">
                    <KeyGraph data={{text: "", words : [""]}}  chosenKey={sKeys.char} code={sKeys.char} count={0}/>
                </div>
            {/if}

        {/each}

    </div>
    <div class="keyboard">
        <Keyboard name={"name"} selectKeys={selectedKey}/>
    </div>
    <h1 class = "selection" style = "padding-left: 4.5em">Select Views</h1>
</div>



<style>

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
        font-family: "neue-haas-grotesk-display", sans-serif;
        font-weight: 600;
        font-style: normal;
    }

    .keyGraph {
        padding-left: 0.85em;
        padding-right: 0.85em;
        padding-bottom: 1em;
    }
</style>

