import * as d3 from "d3";
import {charToKeys} from "$lib/dataProcessor.js";
import {staggeredENG} from "$lib/layouts/keysENG.js";
import {staggeredFR} from "$lib/layouts/keysFR.js";
import {staggeredFRCSA} from "$lib/layouts/keysFRCSA.js";
import {staggeredDvorak} from "$lib/layouts/keysDvorak.js";
import {staggeredLetters} from "$lib/layouts/keysLetters.js";

export const cooldowns = {
    one : 0.0007,
    two : 0.0009,
    three : 0.001
}

export  const fillerKeyType = {
    code: "Click a key to begin",
    char :"Click a key to begin",
    heatValue : 0
}

export const customKeyDimensions = (dim) =>
{
    return {
        h: dim,
        w: dim,
        textX: dim / 2,
        textY: dim / 2,
        fontSize: dim * 0.25,
        dim : dim
    }
}

export const keyDimensions = customKeyDimensions(70)



export const getStaggered = (name) => {
    if (name === "qwerty") return staggeredENG;
    if (name === "azerty") return staggeredFR;
    if (name === "french-csa") return staggeredFRCSA;
    if (name === "dvorak") return staggeredDvorak;
    if (name === "letters") return staggeredLetters;
    return staggeredENG;
}

export const views = [
    {id: "live", name: "Live Typing"},
    {id : "gallerySelection", name: "Gallery Selection"},
    {id: "upload", name: "Upload text"},
    {id :  "justTyping", name: "Just Typing"}
]

const rMin = 0
const rMax = 100

/* Colours and scales */
const getScale = (d) => Math.log10(d + 1)
const getScale2 = (d) => Math.sqrt(d)
const getScale3 = (d) => Math.pow(d, 5/7)
export const getColour = d3.scaleLinear()
    .range(["white", "#bd0101"])
    .domain([rMin,rMax])
    .clamp(true)

const colRange2 = d3.interpolateRgbBasis(["white", "#fd861e","#fd4a1e", "#cc0b0b"])
const colRange3 = (t) => d3.interpolateYlOrRd(t)
const colRange4 = (t) => d3.interpolateOrRd(t)

export const getColour2 = (d, vMax=rMax) => {
    return d3.scaleSequential(colRange2)
        .domain([getScale3(rMin),getScale3(vMax)])
        .clamp(true)
        (getScale3(d))
    }
export const getColour3 = (d, vMax=rMax) => {
    return d3.scaleSequential(colRange3)
        .domain([getScale2(rMin), getScale2(vMax)])
        .clamp(true)
        (getScale2(d))
    }

export const getColour4 = (d, vMax=rMax) => {
    return d3.scaleSequential(colRange3)
        .domain([getScale2(rMin), getScale2(vMax)])
        .clamp(true)
        (getScale2(d))
    }
    



function simulateKeypressEvents(str) {
    const events = [];

    for (const ch of str) {
        const entry = charToKeys[ch];
        if (!entry) continue;

        if (entry.shift) {
            events.push({ key: "Shift", code: "ShiftLeft" });
        }

        events.push({ key: ch, code: entry.code });
    }

    return events;
}



