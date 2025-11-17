import * as d3 from "d3";
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

const dim = 70
export const keyDimensions = {
    h : dim,
    w : dim,
    textX : dim/2,
    textY : dim/2,
    fontSize : dim*0.25
}



export const customKeyDimensions = (dim) =>
    {
        return {
            h: dim,
            w: dim,
            textX: dim / 2,
            textY: dim / 2,
            fontSize: dim * 0.25
        }
    }



    export const views = [
    "live",
    "text",
    "upload",
    "challenge"
]


export const getColour = d3.scaleLinear()
    .range(["white", "#bd0101"])
    .domain([1,50])

const colRange = d3.interpolateRgbBasis(["white", "yellow", "orange", "#bd0101"])
const colRange2 = d3.interpolateRgbBasis(["white", "#ff380a", "#9f0000"])
export const getColour2 = d3.scaleSequential(colRange2)
    .domain([0,40])
    .clamp(true)
export const getColour3 = d3.scaleSequential(d3.interpolateInferno)
    .domain([1,50])
    .domain([Math.log(1), Math.log(50)])