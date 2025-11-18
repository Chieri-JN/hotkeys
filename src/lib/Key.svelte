<script lang="ts">
    import {onMount} from "svelte";
    import * as d3 from "d3";
    import type {textData} from "./types";
    import { cooldowns, getColour, getColour2, getColour3, customKeyDimensions, emptyData} from "./constants";


    let {
        key ,
        size=1,
        code,
        shiftOn=false,
        count=0,
        corpus = emptyData,
        isStatic=false,
        onUpdate,
        onClick,
        dims = 70,
        allowCooling=false
    } :
        {
            key : string,
            size : number,
            code : string,
            shiftOn : boolean,
            count : number,
            corpus : textData,
            isStatic:boolean
            onUpdate ?: (code: string, count: number, char: string) => void,
            onClick?: (code: string, char : string) => void,
            dims : number,
            allowCooling : boolean
        } = $props()

    let keyDimensions = customKeyDimensions(dims)
    let svgElem: SVGSVGElement;
    let gElem: SVGGElement;
    let toolElem : HTMLDivElement;
    let viewElem : HTMLDivElement;
    let tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;


    let rectElem: d3.Selection<SVGRectElement, unknown, null, undefined>;
    let textElem: d3.Selection<SVGTextElement, unknown, null, undefined>;
    let lastCount = 0;

    let keyInitialized = false;

    function mouseover(event, d) {
        tooltip.style("opacity", 1)
            .html(`<strong style="font-weight: 700;">Key: ${key}</strong>
								<br> <span style="font-family: neue-haas-grotesk-display, sans-serif;"> <em >Tempurature: </em>${Math.round(count) + "ºC"}</span>
								<br><span style="font-family: neue-haas-grotesk-display, sans-serif;"> <em>Frequency: </em>${" ---"}</span>`);
    }

    function mousemove(event, d) {
        tooltip
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 20 + "px");
    }
    function mouseleave(event,d) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
    }

    function mouseclick(event, d) {
        // console.log({key} + " was clicked!")
        // count ++;
        // updateKey();
        if (onClick) onClick(code, key);
    }

    function doubleClick(event, d) {

    }

    function makeKey() {

        if (!gElem) return;


        const svg = d3.select(svgElem)
            .append("svg")
        svg.selectAll("*").remove();

        const g = d3.select(gElem);
        g.selectAll("*").remove();

        // g.style("cursor", "pointer")
        //     .on("click", mouseclick)

        // rect = d3.select(svgElem)
        // svg.append('g')
        rectElem = g.append("rect")
        .attr("width", keyDimensions.w*size)
        .attr("height", keyDimensions.h)
        .attr("rx", 6)
        .attr("ry", 6)
        .attr  ("fill", getColour2(count))
        .attr("stroke", "#111111")
        .attr("stroke-width", 1)
        .style("border-radius", "5px")
        .style("cursor", "pointer")
        .on("mouseover", mouseover )
        .on("mousemove", mousemove )
        .on("mouseleave", mouseleave )
        .on("click", mouseclick )

        // rectElem.transition().duration(500).attr("fill", getColour2(count))


        g.append("text")
            .attr("x", (keyDimensions.textX * size) )
            .attr("y", keyDimensions.textY)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .attr("font-size", keyDimensions.fontSize)
            .attr("font-family", "neue-haas-grotesk-display, sans-serif")
            .attr("font-weight", 500)
            .text(key);

        textElem = g.append("text")
            .attr("x", (keyDimensions.textX * size) )
            .attr("y", keyDimensions.textY + 20)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .attr("font-size", 12)
            .attr("font-family", "neue-haas-grotesk-display, sans-serif")
            .attr("font-weight", 500)
            .text(Math.round(count))

        if (!tooltip) {
            tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0)
                .style("background-color", "white")
                .style("border-color", "#5577bb")
                .style("border", "solid")
                .style("border-radius", "5px")
                .style("border-width", "2px")
                .style("padding", "8px")
                .style("position", "absolute")
                .style("font-family", " redonda, sans-serif")
                .style("font-style", "normal")
                // .style("font-weight", 400)
                .style("pointer-events", "none");
        }

        keyInitialized = true;
        lastCount = count;
    }

    function updateKey() {
        if (rectElem) rectElem.attr("fill", getColour2(count));
        if (textElem) textElem.text(Math.round(count));
        //

        lastCount = count;
    }

    $effect(() => {
        if (gElem && !keyInitialized) {
            makeKey();
        }
    });

    $effect(() => {
        if (keyInitialized && Math.round(count)!== Math.round(lastCount)) {
            updateKey();
            if (onUpdate) onUpdate(code, count, key);
        }

    });


    let rafId: number | null = null;
    let lastTime = performance.now();

    function coolingStep(now: number) {
        const dt = now - lastTime;
        lastTime = now;
        count -= dt * cooldowns.one;
        if (count < 0) count = 0;
        updateKey();
        if (allowCooling) {
            rafId = requestAnimationFrame(coolingStep);
        } else {
            rafId = null;
        }
    }

    $effect(() => {
        if (!isStatic) {
            if (allowCooling && !rafId) {
                lastTime = performance.now();
                rafId = requestAnimationFrame(coolingStep);
            }
            if (!allowCooling && rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        }
    });




    let last = performance.now();
    function decay(now: number) {
        const dt = now - last;
        last = now;

        count -= dt * cooldowns.one; // decrease proportional to time elapsed
        if (count < 0) count = 0;

        requestAnimationFrame(decay);
    }

    onMount(() =>{

        if (!isStatic) {// makeKey();

            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.code === code) {
                    count++;
                    // makeKey();
                    updateKey();
                }

            };

            window.addEventListener("keydown", handleKeyDown);

            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    });
</script>


<!--<g bind:this={svgElem} />-->

<!--<svg bind:this={svgElem} > </svg>-->
<div class="key"  bind:this={toolElem}>
    <svg bind:this={svgElem} width={keyDimensions.w * size} height={keyDimensions.h} style="overflow: visible;">
        <g bind:this={gElem} />
    </svg>
</div>



<style>
    svg {
        display: block;
    }
</style>