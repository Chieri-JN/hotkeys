<script lang="ts">
    import {onMount} from "svelte";

    let {kValues , size=1, code, shiftOn=false} :
        {kValues : string[], size : number, code : string, shiftOn : boolean} = $props()


    function makeKey() {

    }

    onMount(makeKey);
</script>




<style>

</style>