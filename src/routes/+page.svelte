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
    let narrative = $state(false) // TODO : CHANGE BACK TO FALSE
    let firstBoardDims = 39;
    let secondBoardDims = 50;
    let selectedBigLang = $state("eng");
    let selectedBigramData = $state(engBigrams);
    let chosentFirstBi = $state("");
    let chosenSecondBi = $state("");
    let totalBrgramCount = $derived(selectedBigramData.length);
    let totalBigramFrequency = $derived(selectedBigramData.reduce((acc, bg) => acc + bg.freq, 0));


    let relevantBigrams = $derived(
        chosentFirstBi 
            ? selectedBigramData.filter(bg => bg.first === chosentFirstBi).sort((a, b) => b.freq - a.freq).slice(0, 20)
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
    let totalTrigramCount = $derived(selectedTrigramData.length);
    let totalTrigramFrequency = $derived(selectedTrigramData.reduce((acc, tri) => acc + tri.freq, 0));

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
            ? selectedTrigramData.filter(tri => tri.first === chosenFirstTri && tri.second === chosenSecondTri).sort((a, b) => b.freq - a.freq).slice(0, 100)
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
        <Key key="Begin" code="Begin" onClick={() => {narrative=true; $showLayout=true}} size={2} dims={100} isStatic={true} onUpdate={() => {}} inKeyboard={false} interaction={true} clickOn={true} colourCode={1} secondaryColourCode={1} count={true} />
    </div>
{:else}
    <div>
        <h1 class = "subhead">What is <em>QWERTY</em> ?</h1>

        <div class="intro">
            <div class="TextBox">
                <p><em>QWERTY</em> is a keyboard layout originally created in the 1870s for mechanical typewriters. 
                    It was originally designed to reduce jamming by spacing out commonly used letter pairs and slowing down 
                    typing just enough to keep the mechanical arms from colliding. Even though modern day keyboards do not jam like 
                    mechanical typewriters used to, QWERTY remains extremely popular and is considered the standard for modern keyboards. 
                </p>
                <p>
                    Many alternatives to QWERTY have been created throughout the years, proclaiming to be more efficient than the original. 
                    One such variant is known as Dvorak. It is claimed that Dvorak offers more efficient typing than QWERTY as it supposedly 
                    reduces the amount of movement needed to type things out. Despite this, Dvorak has not reached anywhere close to the level
                    of adoption that QWERTY has, in part due to people already knowing/being taught QWERTY and in part due to the better efficiency 
                    claims being poorly backed. However, it is still an interesting alternative to consider, and it is the subject of this project.
                </p>
                <p>
                    Other variants of QWERTY were born to better accommodate different languages. For example the CSA keyboard, used as the French 
                    Canadian keyboard by Apple, is a QWERTY variant with dedicated keys for “ÇÈÀÉÙ”. 
                    Another variant is the French AZERTY keyboard, named after the 6 first letters in the top left. 
                </p>
            </div>
        

            <div class="keyboardHolder">
                <div class="keyboard0">
                    <Keyboard name={"qwerty"} selectKeys={selectedKey} isStatic={true} allowCooling={false} data={qwertyData} boardDims={45} specialKeys="count" colourCode={4}/>
                    <p class="subtitle">QWERTY Keyboard Layout</p>
                </div>
                <div class="keyboard0">
                    <Keyboard name={"dvorak"} selectKeys={selectedKey} isStatic={true} allowCooling={false} data={qwertyData} boardDims={45} specialKeys="count" colourCode={4}/>
                    <p class="subtitle">Dvorak Keyboard Layout</p>
                </div>

            </div>
        </div>

     
        <!-- <h2>Character Frequencies</h2> -->
        <div class="freqs">
            <h1>Character Frequencies</h1>
            <!-- <p2><em>Freqs</em></p2> -->
             <div class="TextBox2">
                <p>
                    How important is layout when it comes to typing things out? More specifically, does Dvorak truly offer some benefit that 
                    trumps the familiarity of QWERTY? Is CSA better than AZERTY? Do the “hotkeys” of a language impact this? Looking at the 
                    distribution of characters from both the English and French wikipedia we can see that the character “e” dominates in both. 
                </p>
                
             </div>
             

            <div class="visHolder">
                <div class="keyboardHolder">
                    <p3>Character Frequency Across English Wikipedia</p3>
                    <div class="keyboard">
                        <Keyboard name={"qwerty"} selectKeys={selectedKey} isStatic={true} allowCooling={false} data={engWikiData} boardDims={firstBoardDims} specialKeys="count" interaction={true}/>
                        <p class="subtitle">QWERTY - English</p>
                    </div>
                    <div class="keyboard">
                        <Keyboard name={"dvorak"} selectKeys={selectedKey} isStatic={true} allowCooling={false} data={engWikiData} boardDims={firstBoardDims} specialKeys="count" interaction={true}/>
                        <p class="subtitle">DVORAK - English</p>
                    </div>
                </div>

                <div class="keyboardHolder">
                    <p3>Character Frequency Across French Wikipedia</p3>
                    <div class="keyboard">
                        <Keyboard name={"azerty"} selectKeys={selectedKey} isStatic={true} allowCooling={false} data={frWikiData} boardDims={firstBoardDims} specialKeys="count" interaction={true}/>
                        <p class="subtitle">AZERTY - French</p>
                    </div>
                    <div class="keyboard">
                        <Keyboard name={"french-csa"} selectKeys={selectedKey} isStatic={true} allowCooling={false} data={frWikiData} boardDims={firstBoardDims} specialKeys="count" interaction={true}/>
                        <p class="subtitle">CSA - French</p>
                    </div>
                </div>
                
            </div>
            <div class="TextBox2">
                <p>
                    Knowing what the most frequent  and least frequent characters are does not tell us enough about whether a keyboard layout is useful.
                    The next thing to explore when discussing the efficacy of a keyboard layout are the common sequences are characters. 
                    We can look at the bigrams and trigrams of the characters to see how often they appear together.
                </p>
                
             </div>
        </div>

    </div>
    <div>

        <div class="sequences">
            <h1>Sequencing the Characters</h1>
            
            <div class="Bisequence">
        
                <div class='Bilabels'>
    
                    <label>
                        <input type="radio" name="bi" value="eng" onchange={handleChangeBigram} checked={selectedBigLang === "eng"}/>
                        <p3>English Bigrams</p3>
                    </label>
                    
                    <label>
                        <input type="radio" name="bi" value="fr" onchange={handleChangeBigram} />
                        <p3>French Bigrams</p3>
                    </label> 
                    <button class="clearButton" onclick={() => {chosentFirstBi = ""}}>Clear Selection</button>
                </div>
                
               <div class="visHolder">
                <div class="TextBox3">
                    <p>
                        Sequences of two characters are called bigrams. Doing a little bit of math given that the 26 letters of the alphabet, 
                        we have 676 possible combinations. However a little bit of analysis will reveal that some of these combinations are very very unlikely. 
                        For example the letter “q” is almost always guaranteed to be succeeded by the letter “u”. On the other hand, letters like “e” and “a” 
                        have a lot more possibilities.
                    </p>
                    <h2><strong>Bigram Prefix:</strong> <em>{chosentFirstBi || "Selecet a letter"}</em></h2>
                    <h2><strong>Bigram Frequency:</strong> <em>{chosentFirstBi ? ((relevantBigrams.find(bg => bg.first === chosentFirstBi)?.freq || 0) / totalBigramFrequency * 100).toFixed(2) + '%' : '0%'}</em></h2>
                    
                </div>

                <Bipartite data={selectedBigramData} lang={selectedBigLang} chosentFirstBi={chosentFirstBi} chosenSecondBi={chosenSecondBi}/>
               </div>

                {#if selectedBigLang === "fr"}
                <div class="keyboardHolder2">
                    <div class="keyboard2"> 
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
                        <p class="subtitle">AZERTY</p>
                    </div>
                    <div class="keyboard2"> 
                        <Keyboard 
                        name={"lettersCSA"} 
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
                        <p class="subtitle">CSA</p>
                    </div>

                    </div>
                {:else}
                <div class="keyboardHolder2">
                    <div class="keyboard2">
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
                            <p class="subtitle">QWERTY</p>
                    </div>

                    <div class="keyboard2">
                        <Keyboard 
                            name={"lettersDvorak"} 
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
                            <p class="subtitle">Dvorak</p>
                    </div>
                
                    </div>
                {/if}
            </div>
            
            <div class="Trisequence">
                
               
                <div class='Bilabels'>
                    <!-- <button onclick={() => {chosenFirstTri = ""; chosenSecondTri = ""; chosenThirdTri = "";}}>Clear</button> -->
                    <label>
                        <input type="radio" name="tri" value="eng" onchange={handleChangeTrigram} checked={selectedTrigLang === "eng"}/>
                        <p3>English Trigrams</p3>
                    </label>
                    
                    <label>
                        <input type="radio" name="tri" value="fr" onchange={handleChangeTrigram} />
                        <p3>French Trigrams</p3>
                    </label> 
                    <button class="clearButton" onclick={() => {chosentFirstBi = ""}}>Clear Selection</button>
                </div>
                <div class="visHolder">
                    <div class="TextBox3">
                        <p>
                            If we add a third letter to our sequence we get trigrams. Doing a bit of math will reveal that all the possible 
                            combinations for trigrams are exponentially bigger than that of bigrams, sitting at a whopping 17576.
                             For the sake of simplicity the visualization is constrained to the top 1500 trigrams. Using the previous example of “qu”,
                              we can see that “qu” is the only 2 character prefix starting with "q" that makes up any trigram in the top 1500. 

                        </p>
                        <h2><strong>Trigram Prefix:</strong> <em>{chosenFirstTri + chosenSecondTri || "Selecet letters"}</em></h2>   
                        <h2><strong>Trigram Frequency:</strong> <em>{chosenFirstTri + chosenSecondTri ? ((relevantTrigrams.find(tri => tri.first === chosenFirstTri && tri.second === chosenSecondTri)?.freq || 0) / totalTrigramFrequency * 100).toFixed(2) + '%' : '0%'}</em></h2>
                    </div>
                    <Tripartite data={selectedTrigramData} lang={selectedTrigLang} chosenFirstTri={chosenFirstTri} chosenSecondTri={chosenSecondTri} chosenThirdTri={chosenThirdTri}/>
                </div>

                {#if selectedTrigLang === "fr"}
                    <div class="keyboardHolder3">
                        <div class="keyboard2">
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
                                <p class="subtitle">AZERTY</p>
                        </div>
                        <div class="keyboard2">
                            <Keyboard name={"lettersCSA"} 
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
                                <p class="subtitle">CSA</p>
                        </div>
                    </div>
                {:else}
                    <div class="keyboardHolder3">
                        <div class="keyboard">
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
                            <p class="subtitle">QWERTY</p>
                        </div>
                        <div class="keyboard">
                            <Keyboard name={"lettersDvorak"} 
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
                            <p class="subtitle">Dvorak</p>
                        </div>
                    </div>
                {/if}
            </div>
            <!--   Network graph  -->
<!--            <div>-->
<!--                <h2>Common words in English</h2>-->
<!--                <NetworkGraph />-->
<!--            </div>-->
        </div>
    </div>
<!-- 
    <div>
        Upload sample text!
        
    </div> -->
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
        /* font-style: italic; */
    }
    p {
        font-family: "neue-haas-grotesk-display", sans-serif;
        font-weight: 400;
        font-style: normal;
    }

    p3 {
        font-family: "neue-haas-grotesk-display", sans-serif;
        font-weight: 600;
        font-style: normal;
        font-size: 1.4em;
        padding-bottom: 0.5em;
        em {
            font-style: italic;
            font-weight: 700;
        }
    }
    .subtitle {
        font-family: "neue-haas-grotesk-display", sans-serif;
        font-weight: 500;
        font-style: italic;

    }

    .sequences {
        padding : 1em;

        display: flex;
        flex-direction: column;
        
        h1 {
            padding-top: 1em;
            padding-left: 0.5em;
            padding-bottom: 0.5em;
        }
    }

    .Bilabels {
        gap: 1em;
        display: flex;
        flex-direction: row;
        .clearButton {
            /* margin-left: auto; */
            /* padding: 0.25em; */
            padding-left: 0.5em;
            padding-right: 0.5em;
            margin-right: 0.5em;
            border-radius: 0.5em;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            cursor: pointer;
            font-size: 1.2em;
            font-weight: 600;
            color: #333;
   
        }
        /* justify-content: space-between; */
        /* align-items: center; */

    }
    .Bisequence {
        padding-top: 1em;
        padding-bottom: 1em;
    }
    .Trisequence{
        padding-top: 1em;
    }
    .intro {
        padding: 1em;
        display: flex;
        flex-direction: row;

        p {
            font-size: 1.2em;
            em {
                font-style: italic;
                font-weight: 600;
            }
        }
    }

    .freqs {
        padding-left: 1em;
        display: flex;
        flex-direction: column;
        gap: 1em;
         h1 {
            padding-left: 0.5em;
            /* padding-bottom: -0.5em; */
         }
    }

    

    .TextBox {
        /* padding: 1em; */
        padding-right: 1em;
        padding-top: 1em;
        padding-left: 1em;
        width: 40%;
        gap : 1em;
        display: flex;
        flex-direction: column; 
    }
    .TextBox p {
        font-size: 1.2em;
        em {
            font-style: italic;
            font-weight: 600;
        }
    }

    .TextBox3 {
        /* padding: 1em; */
        padding-right: 1em;
        padding-top: 1em;
        padding-left: 1em;
        width: 30%;
        /* gap : 1em; */
        display: flex;
        flex-direction: column; 
    }
    .TextBox3 p {
        font-size: 1.4em;
        em {
            font-style: italic;
            font-weight: 600;
        }
    }

    .TextBox2 {
        /* padding: 1em; */
        padding-right: 1em;
        /* padding-top: 1em; */
        padding-left: 1em;
        width: 95%;
        /* gap : 1em; */
        display: flex;
        flex-direction: column; 
    }
    .TextBox2 p {
        font-size: 1.3em;
        em {
            font-style: italic;
            font-weight: 600;
        }
    }

    .keyboard {
        /*width: 100vw;*/
        /*display: flex;*/
        /*flex-direction: row;*/
        justify-items: center;
        text-align: center;
        justify-content: center;
        /* padding-top: 1em; */
        /* padding-left: 1em; */
    }
    .keyboard0 {
        padding-right: 1em;
        /* padding-bottom: 1em; */
        justify-items: center;
        text-align: center;
        justify-content: center;
        padding-left: 1em;
    }
    .keyboardHolder {
        /* padding-top: 1em; */
        align-items: center;
        justify-content: center;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    .keyboard2 {
        /*width: 100vw;*/
        /*display: flex;*/
        /*flex-direction: row;*/
        justify-items: center;
        text-align: center;
        justify-content: center;
        padding-top: 1em;
        padding-left: 1em;
    }
    .keyboardHolder2 {
        padding-top: 1em;
        display: flex;
        /* gap: 1em; */
    }

    .keyboardHolder3 {
        padding-top: 1em;
        display: flex;
        gap: 1em;
    }
    .visHolder{
        display: inline-flex;
        gap : 3em;
        flex-direction: row;
        /* justify-content: center;
        align-items: center;
        text-align: center;
        justify-items: center;
        text-align: center;
        justify-content: center; */

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
        padding-left: 0.5em;
        /*font-weight: bold;*/
        font-family: "redonda", sans-serif;
        font-weight: 800;
        em {
            font-style: italic;
        }
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


 
