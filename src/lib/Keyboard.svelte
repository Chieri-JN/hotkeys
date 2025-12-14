<script lang="ts">
    import { staggeredENG } from "./keysENG";
    import { staggeredFR } from "./keysFR";
    import { staggeredFRCSA } from "./keysFRCSA";
    import { staggeredDvorak } from "./keysDvorak";
    import { staggeredLetters } from "./keysLetters";

    import Key from "$lib/Key.svelte";
    import { cooldowns, customKeyDimensions,emptyData } from "./constants";
    import type {textData, keyType} from "./types";
    let {name="", data=emptyData, selectKeys=undefined, isStatic=false, boardDims=70, allowCooling=false, specialKeys="none"} :
        { name: string,  data : textData, selectKeys ?: (keys : keyType []) => void, isStatic :boolean, boardDims:number, allowCooling:boolean, specialKeys:string} = $props()

    let shiftPressed = false
    let selectedKeys : keyType [] = $state(new Array(3))
    let keyDimensions = customKeyDimensions(boardDims)

    let getStaggered = (name: string) => {
        if (name === "qwerty") return staggeredENG;
        if (name === "azerty") return staggeredFR;
        if (name === "french-csa") return staggeredFRCSA;
        if (name === "dvorak") return staggeredDvorak;
        if (name === "letters") return staggeredLetters;
        return staggeredENG;
    }

    let isSpecial = (code: string) => {
        if (specialKeys === "none") return false;
        if (specialKeys === "all") return true;
        if (specialKeys === "count") return data.keyFreq[code] > 0;
        return false;
    }
    let staggered = getStaggered(name);

    let rowWidths = staggered.map( row => row.reduce((sum, key) => sum + keyDimensions.w * (key.size ?? 1), 0));
    const maxRowWidth = Math.max(...rowWidths) + boardDims/2;
    let selectedKey = $state("KeyE")

    let rowGaps = staggered.map((row, i) => {
        const rowWidth = rowWidths[i];
        const count = row.length;
        if (count <= 1) return 0;
        return (maxRowWidth - rowWidth) / (count - 1);
    });


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
        if (!keyStats[code]) keyStats[code] = { count: 0, clicked: false, char };
        keyStats[code].clicked = true;
        // console.log(`Before Selected Key: ${selectedKey}`)
        selectedKey = code
        // selectedKeys = selectedKeys.slice(1,3).concat([makeKeyType(code, code, keyStats[code].count)])
        selectedKeys = selectedKeys.find(d => (d ??{code:""}).code === code ) && selectedKeys.length > 0? selectedKeys : selectedKeys.slice(1,3).concat([makeKeyType(char, code, keyStats[code].count)])

        console.log(`Key ${code} was clicked!`);
        if(selectKeys) selectKeys(selectedKeys)
        // console.log(`After Selected Key: ${selectedKey}`)
    }

</script>


<div class="keyboard">
    {#each staggered as keyRow, i}
        <div class="keyRow" style="gap: {rowGaps[i]}px; width: {maxRowWidth}px;" >
            {#each keyRow as key}
                 <div class="keySpan">
                     <!--{shiftPressed || key.key.length===1 ? key.key[0] : key.key[1]}-->
                     <!--{shiftPressed ? "Shift + " + key.code : key.code}-->
                     <Key
                         key={key.code==="Space" ? key.code : shiftPressed || key.key.length===1 ? key.key[0] : key.key[1]}
                         size={key.size ?? 1}
                         code={key.code}
                         shiftOn={shiftPressed}
                         isStatic={isStatic}
                         onUpdate={handleKeyUpdate}
                         onClick={handleKeyClick}
                         dims={boardDims}
                         allowCooling={allowCooling}
                         count={data.keyFreq[key.code] ?? 0}
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