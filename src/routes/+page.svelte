<script lang="ts">
    import { goto } from '$app/navigation';
    // Data 
    import { qwertyData, azertyData, engWikiData, frWikiData, engBigrams, frBigrams, dataBuilder, engTrigrams, frTrigrams} from "../lib/dataConstants"

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

    import type { Trigram } from "$lib/types";
    import type { Bigram } from "$lib/types";

    let selectedView = $state("live");
    let isStatic = $state(false);
    let allowCooling = $state(false);
    let selectedKeys = $state([fillerKeyType, fillerKeyType, fillerKeyType]);
    function selectedKey (keys : keyType[]) {
        // selectedChar = key.char
        selectedKeys = keys
    }
    
    

    let loadedData  = $state(null);
    let narrative = $state(true) // TODO : CHANGE BACK TO FALSE
    let firstBoardDims = 25;
    let secondBoardDims = 50;
    let selectedBigLang = $state("eng");
    let selectedBigramData = $state(engBigrams);
    let chosentFirstBi = $state("");
    let chosenSecondBi = $state("");
    let relevantBigrams = $derived(
        chosentFirstBi 
            ? selectedBigramData.filter(bg => bg.first === chosentFirstBi).sort((a, b) => b.freq - a.freq).slice(0, 10)
            : []
    );
    let highlightedBigramData = $derived.by(() => {
        if (!chosentFirstBi) {
            return dataBuilder({});
        }

        const keyMap: Record<string, number> = {
            [charToKeys[chosentFirstBi]?.code || ""]: 1
        };
        
        relevantBigrams.forEach(bg => {
            const secondKeyCode = charToKeys[bg.second]?.code;
            if (secondKeyCode && secondKeyCode !== charToKeys[chosentFirstBi]?.code) {
                keyMap[secondKeyCode] = bg.freq;
            }
        });
        
        return dataBuilder(keyMap);
    })

    function handleClickBigram(code: string, char: string) {
        if (chosentFirstBi !== char.toUpperCase()) {
            chosentFirstBi = char.toUpperCase();
        } else if (chosentFirstBi === char.toUpperCase()) {
            chosentFirstBi = "";

        }
    }

    function handleChangeBigram (event) {
        const value = event.target.value;
        selectedBigLang = value;
        if (selectedBigLang === "eng") {
            selectedBigramData = engBigrams;
        } else {
            selectedBigramData = frBigrams;
        }
    }
    
    let selectedTrigLang = $state("eng");
    let selectedTrigramData = $state(engTrigrams);
    let chosenFirstTri = $state("");
    let chosenSecondTri = $state("");
    let chosenThirdTri = $state("");

    function handleClickTrigram(code: string, char: string) {
        if (chosenFirstTri === "") {
            chosenFirstTri = char.toUpperCase();
        } else if (chosenSecondTri === "") {
            
            chosenSecondTri =  char.toUpperCase();
        } else if (chosenSecondTri === char.toUpperCase()) {
            chosenSecondTri = "";
        } else if (chosenFirstTri === char.toUpperCase()) {
            chosenSecondTri = chosenFirstTri;
            chosenFirstTri = "";
        
        } else {
            chosenFirstTri = char.toUpperCase();
            chosenSecondTri = "";
        }
    }

    let relevantTrigrams = $derived(
        (chosenFirstTri && chosenSecondTri)
            ? selectedTrigramData.filter(tri => tri.first === chosenFirstTri && tri.second === chosenSecondTri).sort((a, b) => b.freq - a.freq).slice(0, 50)
            : []
    );
    let highlightedTrigramData = $derived.by(() => {
        if (!chosenFirstTri || !chosenSecondTri) {
            return dataBuilder({[charToKeys[chosenFirstTri]?.code || ""]: 1, [charToKeys[chosenSecondTri]?.code || ""]: 2});
        }
        
        const keyMap: Record<string, number> = {
            [charToKeys[chosenFirstTri]?.code || ""]: 1,
            [charToKeys[chosenSecondTri]?.code || ""]: 2
        };
        
        relevantTrigrams.forEach(tri => {
            const thirdKeyCode = charToKeys[tri.third]?.code;
            if (thirdKeyCode && thirdKeyCode !== charToKeys[chosenFirstTri]?.code && thirdKeyCode !== charToKeys[chosenSecondTri]?.code) {
                keyMap[thirdKeyCode] = tri.freq;
            }
        });

        return dataBuilder(keyMap);
    }) 
    
    
    function handleChangeTrigram (event) {
        const value = event.target.value;
        selectedTrigLang = value;
        if (selectedTrigLang === "eng") {
            selectedTrigramData = engTrigrams;
        } else {
            selectedTrigramData = frTrigrams;
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
                <h2>Bigram Prefix: {chosentFirstBi}</h2>
                <button onclick={() => {chosentFirstBi = ""}}>Clear</button>
                <div class='Bilabels'>
                    <label>
                        <input type="radio" name="bi" value="eng" onchange={handleChangeBigram} checked={selectedBigLang === "eng"}/>
                        <p2>English Bigrams</p2>
                    </label>
                    
                    <label>
                        <input type="radio" name="bi" value="fr" onchange={handleChangeBigram} />
                        <p2>French Bigrams</p2>
                    </label> 
                </div>
                
                <Bipartite data={selectedBigramData} lang={selectedBigLang} chosentFirstBi={chosentFirstBi} chosenSecondBi={chosenSecondBi}/>
                {#if selectedBigLang === "fr"}
                    <Keyboard 
                        name={"lettersAZERTY"} 
                        selectKeys={selectedKey} 
                        isStatic={true} 
                        data={highlightedBigramData} 
                        boardDims={secondBoardDims} 
                        specialKeys="none" 
                        colourCode={8} 
                        secondaryColourCode={2}
                        clickOn={true}
                        interaction={false}
                        onClick={handleClickBigram}

                        />
                {:else}
                <Keyboard 
                    name={"lettersENG"} 
                    selectKeys={selectedKey} 
                    isStatic={true} 
                    data={highlightedBigramData} 
                    boardDims={secondBoardDims} 
                    specialKeys="none" 
                    colourCode={8} 
                    secondaryColourCode={2}
                    clickOn={true}
                    interaction={false}
                    onClick={handleClickBigram}

                    />
                {/if}
            </div>
            
            <div>
                <h2>Trigram Prefix: {chosenFirstTri + chosenSecondTri}</h2>   
                <button onclick={() => {chosenFirstTri = ""; chosenSecondTri = ""; chosenThirdTri = "";}}>Clear</button>
                <div class='Trilabels'>
                    <label>
                        <input type="radio" name="tri" value="eng" onchange={handleChangeTrigram} checked={selectedTrigLang === "eng"}/>
                        <p2>English Trigrams</p2>
                    </label>
                    
                    <label>
                        <input type="radio" name="tri" value="fr" onchange={handleChangeTrigram} />
                        <p2>French Trigrams</p2>
                    </label> 
                </div>
                <Tripartite data={selectedTrigramData} lang={selectedTrigLang} chosenFirstTri={chosenFirstTri} chosenSecondTri={chosenSecondTri} chosenThirdTri={chosenThirdTri}/>
                {#if selectedTrigLang === "fr"}
                    <Keyboard name={"lettersAZERTY"} 
                        selectKeys={selectedKey} 
                        isStatic={true} 
                        data={highlightedTrigramData} 
                        boardDims={secondBoardDims} 
                        specialKeys="none" 
                        colourCode={9} 
                        secondaryColourCode={3}
                        clickOn={true}
                        interaction={false}
                        onClick={handleClickTrigram}

                        />
                {:else}
                    <Keyboard name={"lettersENG"} 
                        selectKeys={selectedKey} 
                        isStatic={true} 
                        data={highlightedTrigramData} 
                        boardDims={secondBoardDims} 
                        specialKeys="none" 
                        colourCode={9} 
                        secondaryColourCode={3}
                        clickOn={true}
                        interaction={false}
                        onClick={handleClickTrigram}

                        />
                {/if}
            </div>
            <!--   Network graph  -->
<!--            <div>-->
<!--                <h2>Common words in English</h2>-->
<!--                <NetworkGraph />-->
<!--            </div>-->
        </div>
    </div>

<!--    <div>-->

<!--        <h1>Put together</h1>-->
<!--        <div>-->
<!--            <h2>Trajectories</h2>-->
<!--            <NetworkGraph />-->
<!--        </div>-->
<!--        <div>-->
<!--            <h2>Typing Bigrams</h2>-->
<!--&lt;!&ndash;            SLIDER FOR FREQUENCY of BIGRAM..... &ndash;&gt;-->
<!--&lt;!&ndash;            <div class="sliderSpace">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                        <input class="timeSlider" type="range" name="slider" min="0" max="100" >&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--            <Heatmap />-->
<!--&lt;!&ndash;            HEAT MAP + Keyboard + bigram 2 coord&ndash;&gt;-->
<!--        </div>-->
<!--    </div>-->

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


 
