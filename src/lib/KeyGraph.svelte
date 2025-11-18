<script lang="ts">
    import type {textData} from "./types";
    import {emptyData} from "./constants";

    let {data=emptyData, chosenKey, code, count} : {data : textData, chosenKey : string, code : string, count : number } = $props();
</script>


<div class="Box">
    <p class="Title">{chosenKey}</p>
</div>

<style>

    * {
        /*padding: 3em;*/
    }

    .Box {
        width: 360px;
        height: 200px;
        background-color: #989898;
        border-radius: 8px;
        /*padding: 1em;*/
        /*align-content: center;*/
        /*justify-content: center;*/
        align-items: center;
        justify-content: center;
        display: flex;
    }

    .Title {
        font-family: "redonda", sans-serif;

    }
</style>