import * as d3 from 'd3';

export interface keyType{
    char? : string;
    heatValue?: number
    code : string
    shift?: boolean;
}

export interface  textData {
    text : string
    words : string []
    freq :  Record<string, number>
    keyFreq : Record<string, number>
}

