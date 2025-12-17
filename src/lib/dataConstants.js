import {parseString, parseData} from "$lib/dataProcessor.js";
import {text1} from "$lib/sampleTexts.js";
import wikiDataEng from "$lib/data/wikipedia_keyboard_char_counts.json";
import wikiDataFr from "$lib/data/wikipedia_keyboard_char_counts_fr.json";
import frenchBigram from "$lib/data/frBi.json";
import frenchTrigam from "$lib/data/french_trigrams.json";
import englishBigram from "$lib/data/engBig.json";
import englishTrigam from "$lib/data/english_trigrams.json";

export const emptyData = {text: "", words : [""], freq:{"" : 0}, keyFreq: {"" : 0}}
export const sampleData = parseString(text1)
export const qwertyData = {text: "", words : [""], freq:{"" : 0}, keyFreq: {"KeyQ" : 20, "KeyW" : 20, "KeyE" : 20, "KeyR" : 20, "KeyT" : 20, "KeyY" : 20}}
export const azertyData = {text: "", words : [""], freq:{"" : 0}, keyFreq: {"KeyA" : 20, "KeyZ" : 20, "KeyE" : 20, "KeyR" : 20, "KeyT" : 20, "KeyY" : 20}}
export const dataBuilder = (d) => ({text: "", words : [""], freq:{"" : 0}, keyFreq: d, totalFreq: 0})

// Wiki data
export const engWikiData = {text: "", words : [""], freq : {"" : 0}, keyFreq: wikiDataEng, totalFreq : 0};
engWikiData.totalFreq = Object.entries(wikiDataEng).reduce((z, [chr, cnt]) => z + cnt, 0)
export const frWikiData = {text: "", words : [""], freq : {"" : 0}, keyFreq: wikiDataFr, totalFreq : 0};
frWikiData.totalFreq = Object.entries(wikiDataFr).reduce((z, [chr, cnt]) => z + cnt, 0)


// Bigrams
export const emptyBigrams = {bi : "", first: "", second: "", freq : 0}
export const engBigrams = Object.entries(englishBigram).map(([bg, count]) => ({bi : bg, first: bg[0], second: bg[1], freq : count}));
engBigrams.sort((a, b) =>  a.freq - b.freq);
export const frBigrams = Object.entries(frenchBigram).map(([bg, count]) => ({bi : bg, first: bg[0], second: bg[1], freq : count }));
frBigrams.sort((a, b) =>  a.freq - b.freq);
// Trigrams
export const emptyTrigrams = {tri : "", first: "", second: "", third: "", freq : 0}
export const engTrigrams = Object.entries(englishTrigam)
    .slice(0, 1500)  // Take top 1500 cause there are so many of them lol
    .map(([bg, count]) => ({
        bi : bg,
        first: bg[0],
        second: bg[1],
        third : bg[2],
        freq : count
    }));
engTrigrams.sort((a, b) =>  a.freq - b.freq);

export const frTrigrams = Object.entries(frenchTrigam)
    .slice(0, 1500)  // Take top 1500
    .map(([bg, count]) => ({
        bi : bg,
        first: bg[0],
        second: bg[1],
        third : bg[2],
        freq : count
    }));
frTrigrams.sort((a, b) =>  a.freq - b.freq);
// Eng words

