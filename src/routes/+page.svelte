<script lang="ts">
    import { goto } from '$app/navigation';
    // Data 
    import { qwertyData, azertyData, engWikiData, frWikiData, engBigrams, frBigrams, dataBuilder} from "../lib/dataConstants"

    // Constants / helpers
    import {fillerKeyType, views} from "../lib/constants.js"
    import { showLayout } from "$lib/stores.js";
    import type { keyType } from "../lib/types";
    import { charToKeys } from "../lib/dataProcessor.js";
    // Components
    import Keyboard from "$lib/Keyboard.svelte";
    import KeyGraph from  "$lib/KeyGraph.svelte"
    import Key from "$lib/Key.svelte";
    import Title from "$lib/Title.svelte";
    import Tripartite from "$lib/Tripartite.svelte";
    import Bipartite from "$lib/Bipartite.svelte";
    import NetworkGraph from "$lib/NetworkGraph.svelte";
    import Heatmap from "$lib/Heatmap.svelte";


    let selectedView = $state("live");
    let isStatic = $state(false);
    let allowCooling = $state(false);
    let selectedKeys = $state([fillerKeyType, fillerKeyType, fillerKeyType]);
    // let selectedKeyData = $state()

    function selectedKey (keys : keyType[]) {
        // selectedChar = key.char
        selectedKeys = keys
    }
    
    

    let loadedData  = $state(null);
    let narrative = $state(true) // TODO : CHANGE BACK TO FALSE
    let firstBoardDims = 25;
    let selectedBigLang = $state("eng");
    let selectedBigramData = $state(engBigrams);
    let chosentFirstBi = $state("");
    let chosenSecondBi = $state("");

    function handleClickBigram(code: string, char: string) {
        if (chosentFirstBi !== char.toUpperCase()) {
            chosentFirstBi = char.toUpperCase();
        // } else if (chosenSecondBi === "") {
        //     chosenSecondBi =  char.toUpperCase();
        } else if (chosentFirstBi === char.toUpperCase()) {
            chosentFirstBi = "";
        
         
        // } else if (chosenSecondBi === char.toUpperCase()) {
        //     chosenSecondBi = "";
        // } else {
        //     chosentFirstBi = char.toUpperCase();
        //     chosenSecondBi = "";
        }
    }

    

    let chosentFirstTri = $state("");
    let chosenSecondTri = $state("");
    let chosenThirdTri = $state("");

    function handleClickTrigram(code: string, char: string) {
        if (chosentFirstTri === "") {
            chosentFirstTri = char.toUpperCase();
        } else if (chosenSecondTri === "") {
            chosenSecondTri =  char.toUpperCase();
        } else if (chosentFirstTri === char.toUpperCase()) {
            chosentFirstTri = "";
        
         
        } else if (chosenSecondTri === char.toUpperCase()) {
            chosenSecondTri = "";
        } else {
            chosentFirstTri = char.toUpperCase();
            chosenSecondTri = "";
        }
    }

    function handleChange (event) {
        const value = event.target.value;
        selectedBigLang = value;
        if (selectedBigLang === "eng") {
            selectedBigramData = engBigrams;
        } else {
            selectedBigramData = frBigrams;
        }
    }

</script>
{#if !narrative}
    <div class="StartView">
        <Title weight={1000} isStatic={false} size={10}/>
        <Key key="Begin" code="Begin" onClick={() => {narrative=true; $showLayout=true}} size={2} dims={100} isStatic={true} onUpdate={() => {}} inKeyboard={false} interaction={true} />
    </div>
{:else}
    <div>
        <h1 class = "subhead">What is <em>QWERTY</em> ?</h1>

        <div class="intro">
            <div class="TextBox">
                <p><em>QWERTY</em></p>
            </div>
            <div class="keyboard">
                <Keyboard name={"qwerty"} selectKeys={selectedKey} isStatic={true} allowCooling={false} data={qwertyData} boardDims={30} specialKeys="count" colourCode={4}/>
            </div>
            <div class="visHolder">

<!--                <div class="keyboard">-->
<!--                    <Keyboard name={"azerty"} selectKeys={selectedKey} isStatic={true} allowCooling={false} data={azertyData} boardDims={20} specialKeys="count"/>-->
<!--                </div>-->
            </div>
        </div>

        <h2>Character Frequencies</h2>
        <div class="freqs">
            <p><em>Freqs</em></p>

            <div class="visHolder">
                <div class="keyboardHolder">
                    <div class="keyboard">
                        <Keyboard name={"qwerty"} selectKeys={selectedKey} isStatic={true} allowCooling={false} data={engWikiData} boardDims={firstBoardDims} specialKeys="count" interaction={true}/>
                        <p class="subtitle">QWERTY</p>
                    </div>
                    <div class="keyboard">
                        <Keyboard name={"dvorak"} selectKeys={selectedKey} isStatic={true} allowCooling={false} data={engWikiData} boardDims={firstBoardDims} specialKeys="count" interaction={true}/>
                        <p class="subtitle">DVORAK</p>
                    </div>
                </div>

                <div class="keyboardHolder">
                    <div class="keyboard">
                        <Keyboard name={"azerty"} selectKeys={selectedKey} isStatic={true} allowCooling={false} data={frWikiData} boardDims={firstBoardDims} specialKeys="count" interaction={true}/>
                        <p class="subtitle">AZERTY</p>
                    </div>
                    <div class="keyboard">
                        <Keyboard name={"french-csa"} selectKeys={selectedKey} isStatic={true} allowCooling={false} data={frWikiData} boardDims={firstBoardDims} specialKeys="count" interaction={true}/>
                        <p class="subtitle">CSA</p>
                    </div>
                </div>
                
            </div>
        </div>

    </div>
    <div>
        <h1>Grouping the Characters</h1>
        <div>
            <div>
                <h2>Bigrams</h2>
                <div class='labels'>
                    <label>
                        <input type="radio" name="lang" value="eng" onchange={handleChange} checked={selectedBigLang === "eng"}/>
                        <p2>English Bigrams</p2>
                    </label>
                    
                    <label>
                        <input type="radio" name="lang" value="fr" onchange={handleChange} />
                        <p2>French Bigrams</p2>
                    </label> 
                </div>
                
                <Bipartite data={selectedBigramData} lang={selectedBigLang} chosentFirstBi={chosentFirstBi} chosenSecondBi={chosenSecondBi}/>
                <Keyboard 
                    name={"letters"} 
                    selectKeys={selectedKey} 
                    isStatic={true} 
                    data={dataBuilder({[charToKeys[chosentFirstBi]?.code || ""]: 1, [charToKeys[chosenSecondBi]?.code || ""]: 2})} 
                    boardDims={50} 
                    specialKeys="count" 
                    colourCode={8} 
                    clickOn={true}
                    interaction={false}
                    onClick={handleClickBigram}

                    />
            </div>
            
            <div>
                <h2>Trigrams</h2>  
                <Tripartite chosentFirstTri={chosentFirstTri} chosenSecondTri={chosenSecondTri} chosenThirdTri={chosenThirdTri}/>
                <Keyboard name={"letters"} 
                    selectKeys={selectedKey} 
                    isStatic={true} 
                    data={dataBuilder({[charToKeys[chosentFirstTri]?.code || ""]: 1, [charToKeys[chosenSecondTri]?.code || ""]: 2, [charToKeys[chosenThirdTri]?.code || ""]: 3})} 
                    boardDims={30} 
                    specialKeys="count" 
                    colourCode={9} 
                    clickOn={true}
                    interaction={false}
                    onClick={handleClickTrigram}

                    />
            </div>
            <!--   Network graph  -->
<!--            <div>-->
<!--                <h2>Common words in English</h2>-->
<!--                <NetworkGraph />-->
<!--            </div>-->
        </div>
    </div>

    <div>

        <h1>Put together</h1>
        <div>
            <h2>Trajectories</h2>
            <NetworkGraph />
        </div>
        <div>
            <h2>Typing Bigrams</h2>
<!--            SLIDER FOR FREQUENCY of BIGRAM..... -->
<!--            <div class="sliderSpace">&ndash;&gt;-->
<!--                        <input class="timeSlider" type="range" name="slider" min="0" max="100" >-->
<!--                    </div>-->
            <Heatmap />
<!--            HEAT MAP + Keyboard + bigram 2 coord-->
        </div>
    </div>

{/if}


<style>
    h1 {
        font-family: "neue-haas-grotesk-display", sans-serif;
        font-weight: 800;
        font-style: italic;
        /*font-size: 5em;*/
    }
    h2 {
        font-family: "neue-haas-grotesk-display", sans-serif;
        font-weight: 500;
        font-style: italic;
    }
    p {
        font-family: "neue-haas-grotesk-display", sans-serif;
        font-weight: 400;
        font-style: normal;
    }

    .subtitle {
        font-family: "neue-haas-grotesk-display", sans-serif;
        font-weight: 500;
        font-style: italic;
    }


    .intro {
        padding-left: 1em;
        display: flex;
        flex-direction: row;
    }

    .keyboard {
        /*width: 100vw;*/
        /*display: flex;*/
        /*flex-direction: row;*/
        justify-items: center;
        text-align: center;
        justify-content: center;
        /* padding-top: 1em; */
        padding-left: 1em;
    }
    .keyboardHolder {
        padding-top: 1em;
    }
    .visHolder{
        display: inline-flex;

    }
    .StartView {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 75vh;
        flex-direction: column;
         gap: 2em;
    }

    .subhead {
        font-size: 3rem;
        padding-left: 3em;
        /*font-weight: bold;*/
        font-family: "redonda", sans-serif;
        font-weight: 800;
        em {
            font-style: italic;
        }
    }

    .options {
        display: flex;
        padding-top: 1em;
        justify-content: flex-start;
        align-items: center;
        /*align-content: center;*/
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





<!--{#await loadedData}-->
<!--    <p>loading data...</p>-->
<!--{:then data}-->
<!--    <p>loaded data!</p>-->
<!--{:catch error}-->
<!--    <p>Something went wrong: {error.message}</p>-->
<!--{/await}-->
<!-- <div class="options">-->

<!--    <label>-->
<!--        Select a view-->
<!--        <select class="selection" bind:value={selectedView}>-->
<!--            Select a View-->
<!--            {#each views as v}-->
<!--                <option value={v.id}>-->
<!--                    {v.name}-->
<!--                </option>-->
<!--            {/each}-->
<!--        </select>-->
<!--    </label>-->
<!--</div>-->
<!--<div class="main">-->
<!--    <div class="sliderSpace">-->
<!--        <input class="timeSlider" type="range" name="slider" min="0" max="100" >-->
<!--    </div>-->
<!--    {#if selectedView==="live"}-->

<!--        <div >-->
<!--            <div class="allContent">-->
<!--                {#each selectedKeys as sKeys}-->
<!--                    {#if sKeys}-->
<!--                        <div class="keyGraph">-->
<!--                            <KeyGraph data={{text: "", words : [""]}}  chosenKey={sKeys.char} code={sKeys.char} count={0}/>-->
<!--                        </div>-->
<!--                    {/if}-->

<!--                {/each}-->

<!--            </div>-->
<!--            <div class="cooler">-->
<!--                <input type="checkbox" bind:checked={allowCooling}>-->
<!--                Allow Cooling-->
<!--            </div>-->
<!--            <div class="keyboard">-->
<!--                <Keyboard name={"name"} selectKeys={selectedKey} isStatic={isStatic} allowCooling={allowCooling}/>-->
<!--            </div>-->
<!--        </div>-->

<!--    {:else if selectedView==="justTyping"}-->
<!--        <div class="cooler">-->
<!--            <input type="checkbox" bind:checked={allowCooling}>-->
<!--            Allow Cooling-->
<!--        </div>-->

<!--        <div class="keyboard">-->
<!--            <Keyboard name={"name"} selectKeys={selectedKey} isStatic={isStatic} allowCooling={allowCooling}/>-->
<!--        </div>-->
<!--    {:else if selectedView==="gallerySelection"}-->
<!--        <h2>Select one of the Gallery texts!</h2>-->
<!--    {:else if selectedView==="upload"}-->
<!--        <h2>Upload a text file!</h2>-->
<!--        {#await loadedData}-->
<!--            <p>loading data...</p>-->
<!--        {:then data}-->
<!--            <p>loaded data!</p>-->
<!--        {:catch error}-->
<!--            <p>Something went wrong: {error.message}</p>-->
<!--        {/await}-->
<!--    {/if}-->
<!--</div>-->

<!--<h1 class = "selection" style = "padding-left: 4.5em">Select Views</h1> -->
<!--<input type="">-->


 
