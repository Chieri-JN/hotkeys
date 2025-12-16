<!-- inspired by https://observablehq.com/@d3/parallel-coordinates -->
<script lang="ts">
    import type { Trigram } from "./types";
    import {emptyTrigrams} from "./dataConstants"
    import {getColour} from "./constants"
    import {onMount} from "svelte";
    import * as d3 from "d3";
    
    let {data=[emptyTrigrams], lang="eng", chosenFirstTri="", chosenSecondTri="", chosenThirdTri=""} : {data : Trigram[], lang: string, chosenFirstTri: string, chosenSecondTri: string, chosenThirdTri: string} = $props();

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    
    // Two axes: one for first letter, one for second letter
    const keys = ["first", "second", "third"];

    let svgElem: SVGSVGElement;
    let gElem: SVGGElement;
    let tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
    const maxFreq = d3.max(data, d => d.freq) || 1;
    // data.sort((a, b) =>  a.freq - b.freq);

    function makeGraph() {
        const maxFreq = d3.max(data, d => d.freq) || 1;
        const minFreq = d3.min(data, d => d.freq) || 1;
        
        const width = 800;
        const height = keys.length * 180;
        const marginTop = 40;
        const marginRight = 10;
        const marginBottom = 40;
        const marginLeft = 10;

        const x = new Map(
            keys.map(key => [
                key,
                d3.scalePoint(letters, [marginLeft, width - marginRight])
            ])
        );

        const y = d3.scalePoint(keys, [marginTop, height - marginBottom]);      

        // Create the SVG container
        const svg = d3.select(svgElem)
            .attr("viewBox", [0, 0, width, height])
            .attr("width", width)
            .attr("height", height)
            .attr("style", "max-width: 100%; height: auto;");
        
        svg.selectAll("*").remove();

        // Create the line generator
        const line = d3.line<[string, string]>()
            .defined(([, value]) => value != null)
            .x(([key, value]) => {
                const scale = x.get(key);
                return scale ? scale(value) || 0 : 0;
            })
            .y(([key]) => y(key) || 0);

        // Append the lines
        svg.append("g")
            .attr("fill", "none")
            // .attr("stroke-width", 1.5)
            .selectAll("path")
            .data(data.filter(d => d.freq > 0))
            .join("path")
            .attr("stroke-width", d => chosenFirstTri === "" ? 1.5 : d.first === chosenFirstTri && chosenSecondTri === "" ? 2.5 : d.first === chosenFirstTri && d.second === chosenSecondTri ? 3.5 : 1.5)
            .attr("stroke-opacity", d => chosenFirstTri === "" ? 0.8 : d.first === chosenFirstTri && chosenSecondTri === "" ? 1 : d.first === chosenFirstTri && d.second === chosenSecondTri ? 1 : 0.15)
            .attr("stroke", d =>  chosenFirstTri === "" ? getColour(lang === "eng" ? 5 : 6, d.freq, maxFreq) :
                d.first === chosenFirstTri && chosenSecondTri === "" ? getColour(lang === "eng" ? 5 : 6, d.freq+maxFreq/7, maxFreq) :
                d.first === chosenFirstTri && d.second === chosenSecondTri ? getColour(lang === "eng" ? 5 : 6, d.freq+maxFreq/7, maxFreq) : getColour(7, d.freq, maxFreq)
            )
            .attr("d", d => line([
                ["first", d.first],
                ["second", d.second],
                ["third", d.third]
            ]))
            .append("title")
            .text(d => `${d.tri}: ${d.freq}`);

        // Append the axis for each key
        svg.append("g")
            .selectAll("g")
            .data(keys)
            .join("g")
            .attr("transform", d => `translate(0,${y(d)})`)
            .each(function(d) {
                const scale = x.get(d);
                if (scale) {
                    d3.select(this as SVGGElement).call(d3.axisBottom(scale).tickSize(0));
                }
            })
            .call(g => g.append("text")
                .attr("x", marginLeft)
                .attr("y", -6)
                .attr("text-anchor", "start")
                .attr("fill", "currentColor")
                .attr("font-weight", "bold")
                .text(d => d === "first" ? "First Letter" : d === "second" ? "Second Letter" : "Third Letter"))
            .call(g => g.selectAll("text")
                .clone(true).lower()
                .attr("fill", "none")
                .attr("stroke-width", 5)
                .attr("stroke-linejoin", "round")
                .attr("stroke", "white"));


    }


    onMount( () => {
        makeGraph();
    })

    $effect(() => {
        if (chosenFirstTri || chosenSecondTri) {
            makeGraph();
        }
    })

    $effect(() => {
        if (data) {
            makeGraph();
        }
    });

</script>

<div>
    <!-- <p>Tripartite</p> -->
    <svg bind:this={svgElem}></svg>
</div>


<style>

</style>