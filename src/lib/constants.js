import * as d3 from "d3";
import {charToKeys} from "$lib/dataProcessor.js";
import {staggeredENG} from "$lib/layouts/keysENG.js";
import {staggeredFR} from "$lib/layouts/keysFR.js";
import {staggeredFRCSA} from "$lib/layouts/keysFRCSA.js";
import {staggeredDvorak} from "$lib/layouts/keysDvorak.js";
import {staggeredLetters} from "$lib/layouts/keysLetters.js";
import {staggeredAZERTY} from "$lib/layouts/keysAZERTY.js";

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
    if (name === "lettersENG") return staggeredLetters;
    if (name === "lettersAZERTY") return staggeredAZERTY;
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
const getScale4 = (d) => Math.pow(d, 3/5)
export const getColour = (k, d, vMax=rMax, f=3) =>
{
    if (k === 1) {
        return getColour2(d, vMax)
    } else if (k === 2) {
        return getColour3(d, vMax)
    }  else if (k === 3) {
        return getColour4(d, vMax)
    }  else if (k === 4) {
        return  d === 0 ? "white" : "#fd4a1e"
    } else if (k === 5) {
        return getColour5(d, vMax)
    } else if (k === 6) {
        return getColour6(d, vMax)
    } else if (k === 7) {
        return getColour7(d, vMax)
    } else if (k === 8) {
        console.log("D", d)
        return d === 1 ? "#5ba3c5" : f === 2 && d!==0?  getColour8(d, vMax) : "white"
    } else if (k === 9) {
            return d === 1 ? "#5ba3c5" : d === 2 ?  "#a8d5e2": f === 3 && d!==0 ? getColour8(d, vMax):  "white"
    } else  {
        return getSpecial(d, vMax)
    }

}

const colRange2 = d3.interpolateRgbBasis(["white", "#fd861e","#fd4a1e", "#cc0b0b"])
const colRange3 = (t) => d3.interpolateYlOrRd(t)
const colRange4 = (t) => d3.interpolateOrRd(t)
const colRange5 = (t) => d3.interpolateReds(t)
const colRange6 = (t) => d3.interpolateYlGnBu(t)
const colRange7 = (t) => d3.interpolateGreys(t)

const colRangeSpecial = d3.interpolateRgbBasis(["#e8f4f8", "#a8d5e2", "#5ba3c5", "#2c7da0", "#014f86"])

const getSpecial = (d, vMax=1) => {
    // Linear scale for special keys (no transformation needed for percentages/small values)
    return d3.scaleSequential(colRangeSpecial)
        .domain([0, vMax])
        .clamp(true)
        (d)
}

const getColour2 = (d, vMax=rMax) => {
    return d3.scaleSequential(colRange2)
        .domain([getScale3(rMin),getScale3(vMax)])
        .clamp(true)
        (getScale3(d))
    }

const getColour3 = (d, vMax=rMax) => {
    return d3.scaleSequential(colRange3)
        .domain([getScale2(rMin), getScale2(vMax)])
        .clamp(true)
        (getScale2(d))
    }

const getColour4 = (d, vMax=rMax) => {
    return d3.scaleSequential(colRange4)
        .domain([getScale2(rMin), getScale2(vMax)])
        .clamp(true)
        (getScale2(d))
    }
    
const getColour5 = (d, vMax=rMax) => {
    return d3.scaleSequential(colRange5)
        .domain([getScale3(rMin), getScale3(vMax)])
        .clamp(true)
        (getScale3(d))
    }

const getColour6 = (d, vMax=rMax) => {
    return d3.scaleSequential(colRange6)
        .domain([getScale2(rMin), getScale2(vMax)])
        .clamp(true)
        (getScale2(d))
    }

const getColour7 = (d, vMax=rMax) => {
    return d3.scaleSequential(colRange7)
        .domain([getScale2(rMin), getScale2(vMax)])
        .clamp(true)
        (getScale2(d))
    }


const getColour8 = (d, vMax=rMax) => {
    return d3.scaleSequential(colRange2)
        .domain([getScale4(rMin), getScale4(vMax)])
        .clamp(true)
        (getScale4(d))
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



