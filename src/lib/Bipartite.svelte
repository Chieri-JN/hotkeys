<script lang="ts">
    import type { textData } from "./types";
    import {emptyData} from "./dataConstants"
    
    let {data=emptyData} : {data : textData} = $props();

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const N = 30;

</script>

<div>
    <p>Bipartite</p>
</div>


<style>

</style>