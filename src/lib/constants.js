import * as d3 from "d3";
import {charToKeys, parseData, parseString} from "$lib/dataProcessor.js";
import {text1} from "$lib/sampleTexts.js";
// import type {keyType} from "./types.js";

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



export const emptyData = {text: "", words : [""], freq:{"" : 0}, keyFreq: {"" : 0}}
export const sampleData = parseString(text1)
export const qwertyData = {text: "", words : [""], freq:{"" : 0}, keyFreq: {"KeyQ" : 20, "KeyW" : 20, "KeyE" : 20, "KeyR" : 20, "KeyT" : 20, "KeyY" : 20}}
export const azertyData = {text: "", words : [""], freq:{"" : 0}, keyFreq: {"KeyA" : 20, "KeyZ" : 20, "KeyE" : 20, "KeyR" : 20, "KeyT" : 20, "KeyY" : 20}}

export const views = [
    {id: "live", name: "Live Typing"},
    {id : "gallerySelection", name: "Gallery Selection"},
    {id: "upload", name: "Upload text"},
    {id :  "justTyping", name: "Just Typing"}
]

const rMin = 0
const rMax = 100
const getScale = (d) => Math.log(d+1) * 12
export const getColour = d3.scaleLinear()
    .range(["white", "#bd0101"])
    .domain([rMin,rMax])
    .clamp(true)

const colRange = d3.interpolateRgbBasis(["white", "yellow", "orange", "#bd0101"])
const colRange2 = d3.interpolateRgbBasis(["white", "#fd861e","#fd4a1e", "#cc0b0b"])
const colRange3 = (t) => d3.interpolateYlOrRd(t)

export const getColour2 = d3.scaleSequential(colRange2)
    .domain([getScale(rMin),getScale(rMax)])
    .clamp(true)
export const getColour3 = d3.scaleSequential(colRange3)
    // .domain([1,50])
    .domain([Math.log(rMin), Math.log(rMax)])
    .clamp(true)




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



