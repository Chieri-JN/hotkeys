<script lang="ts">
import Keyboard from "$lib/Keyboard.svelte";
import type {textData} from "./types";
import { emptyData } from "./constants";
let {data=emptyData, dataSetName="Filler Name"} : {data : textData, dataSetName : string} = $props()
</script>

<div class="panel">
    <p>Hotkeys for {dataSetName}</p>
    <div>
        <Keyboard boardDims={20} isStatic={true} data ={data}/>
    </div>

</div>


<style>
    .panel{
        width : 350px;
        height : 100px;
        /*background-color: #989898;*/
        border-radius: 8px;
        align-items: center;
        justify-content: center;
        /*padding-left: 10em;*/
        padding-top: 2em;
        /*display: flex;*/
    }
</style>