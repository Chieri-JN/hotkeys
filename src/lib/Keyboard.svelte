<script lang="ts">
    import { staggeredENG } from "./layouts/keysENG";
    import { staggeredFR } from "./layouts/keysFR";
    import { staggeredFRCSA } from "./layouts/keysFRCSA";
    import { staggeredDvorak } from "./layouts/keysDvorak";
    import { staggeredLetters } from "./layouts/keysLetters";

    import Key from "$lib/Key.svelte";
    import { cooldowns, customKeyDimensions, getStaggered } from "./constants";
    import {emptyData} from "./dataConstants"
    import type {textData, keyType} from "./types";
    let {name="", data=emptyData, 
        selectKeys=undefined,
        isStatic=false, 
        boardDims=70,
        allowCooling=false, 
        specialKeys="none",
        interaction=false, 
        colourCode=1, 
        secondaryColourCode=3,
        clickOn=false,
        onClick=undefined} :
        { name: string,  data : textData, 
            selectKeys ?: (keys : keyType []) => void, 
            isStatic :boolean, boardDims:number, 
            allowCooling:boolean, 
            specialKeys:string, 
            interaction:boolean, 
            colourCode : number, 
            clickOn : boolean,
            secondaryColourCode : number,
            onClick ?: (code: string, char: string) => void} = $props()

    let shiftPressed = false
    let selectedKeys : keyType [] = $state(new Array(3))
    let keyDimensions = customKeyDimensions(boardDims)
    let staggered = getStaggered(name);
    let maxCount = $derived(Object.values(data.keyFreq).reduce((max, count) => Math.max(max, count), 0))
    let totalCount = $derived(data.totalFreq ?? 1)
    // console.log("Total Count: ", totalCount)

    let isSpecial = (code: string) => {
        if (specialKeys === "none") return false;
        if (specialKeys === "all") return true;
        if (specialKeys === "count") return data.keyFreq[code] > 0;
        return false;
    }

    let rowWidths: number[];
    let rowGaps: number[] = $state([]);
    let rowPaddings: number[] = $state([]);
    let maxRowWidth: number = $state(0);

    if (name !== "lettersENG" && name !== "lettersAZERTY") {
        rowWidths = staggered.map( row => row.reduce((sum, key) => sum + keyDimensions.w * (key.size ?? 1), 0) as number);
        maxRowWidth = Math.max(...rowWidths) + boardDims/2;
        rowGaps = staggered.map((row, i) => {
            const rowWidth = rowWidths[i];
            const count = row.length;
            if (count <= 1) return 0;
            return (maxRowWidth - rowWidth) / (count - 1);
        });
        rowPaddings = staggered.map(() => 0);
    } else {

        const leftKeyWidths = [1.5, 1.75, 2.25];
        const rightMissingWidths = [3.5, 4.25, 5.75];
        const referenceLeftWidth = leftKeyWidths[0]; // Tab size

        rowWidths = staggered.map(row =>
            row.reduce((sum, key) => sum + keyDimensions.w * (key.size ?? 1), 0)
        );

        rowPaddings = staggered.map((row, i) => {
            if (i >= leftKeyWidths.length) return 0;
            return keyDimensions.w * (leftKeyWidths[i] - referenceLeftWidth);
        });

        const rightFillRatio = 0.2; 
        rowGaps = staggered.map((row, i) => {
            if (i >= rightMissingWidths.length) return 0;
            const count = row.length;
            if (count <= 1) return 0;
            const missingWidth = keyDimensions.w * rightMissingWidths[i] * rightFillRatio;
            return missingWidth / (count - 1);
        });

        const totalRowWidths = rowWidths.map((width, i) => {
            const gapTotal = rowGaps[i] * (staggered[i].length - 1);
            return width + rowPaddings[i] + gapTotal;
        });
        maxRowWidth = Math.max(...totalRowWidths) + boardDims/2;
    }

    let selectedKey = $state("Space")

    export const makeKeyType = (chr, code, count) => {
        return {
            char : chr,
            heatValue : count,
            code : code,
            shift : shiftPressed
        }
    }


    let keyStats = $state<Record<string, {count: number, clicked: boolean, char: string}>>({});

    // Callback to receive data from Key
    function handleKeyUpdate(code: string, count: number, key:string) {
        keyStats[code] = {
            count,
            clicked: keyStats[code]?.clicked || false,
            char : key
        };
    }

    function handleKeyClick(code: string, char:string) {
        // if (!keyStats[code]) keyStats[code] = { count: 0, clicked: false, char };
        // keyStats[code].clicked = true;
        // // console.log(`Before Selected Key: ${selectedKey}`)
        // selectedKey = code
        // // selectedKeys = selectedKeys.slice(1,3).concat([makeKeyType(code, code, keyStats[code].count)])
        // selectedKeys = selectedKeys.find(d => (d ??{code:""}).code === code ) && selectedKeys.length > 0? selectedKeys : selectedKeys.slice(1,3).concat([makeKeyType(char, code, keyStats[code].count)])

        console.log(`Key ${code} was clicked!`);
        // if(selectKeys) selectKeys(selectedKeys)
        // // console.log(`After Selected Key: ${selectedKey}`)

        if(onClick) onClick(code, char)
    }

</script>


<div class="keyboard">
    {#each staggered as keyRow, i}
        <div class="keyRow" style="gap: {rowGaps[i]}px; width: {maxRowWidth}px; padding-left: {rowPaddings[i]}px;" >
            {#each keyRow as key}
                 <div class="keySpan">
                     <!--{shiftPressed || key.key.length===1 ? key.key[0] : key.key[1]}-->
                     <!--{shiftPressed ? "Shift + " + key.code : key.code}-->
                     <Key
                         key={key.code==="Space" ? key.code : shiftPressed || key.key.length===1 ? key.key[0] : key.key[1]}
                         size={key.size ?? 1}
                         code={key.code}
                         clickOn={clickOn}
                         isStatic={isStatic}
                         interaction={interaction}
                         onUpdate={handleKeyUpdate}
                         onClick={handleKeyClick}
                         dims={boardDims}
                         allowCooling={allowCooling}
                         count={data.keyFreq[key.code] ?? 0}
                         freq={(((data.keyFreq[key.code] ?? 0) / totalCount)*100).toFixed(2)}
                         maxVal={maxCount}
                         colourCode={colourCode}
                         secondaryColourCode={secondaryColourCode}
                         isSpecial={isSpecial(key.code)}
                     />
                  </div>
            {/each}
            <div style="flex-grow: 1;"></div>
        </div>

    {/each}
</div>


<style>
    .keyboard {
        background-color: #4b4b4b;
        width: fit-content;
        padding: 1em;
        border-radius: 10px;

    }
    .keyRow {
        display: flex;
        align-items: center;
        align-content: center;
        max-width: max-content;
        margin-bottom: 0.35em;
    }


    .keyRow:last-child {
        margin-bottom: 0;
    }

    .keySpan {
        display: flex;
        align-items: center;
        flex-shrink: 0;

    }
</style>