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
    totalFreq : number
}

export interface Bigram {
    bi : string
    first : string
    second : string
    freq : number
}

export interface Trigram {
    tri : string
    first : string
    second : string
    third : string
    freq : number
}