// This file will contain the logic needed to parse datasets and extract necessary character info


import {text1} from "$lib/sampleTexts.js";
import type {keyType} from "./types";

export function parseData (data :any  ) {
    if (data.type === "string") {
        return parseString((data))
    }

    // if (data instanceof File) {
    //     return parseFile(data);
    // }

    throw new Error("Unsupported data type passed to parseData() type : {}");
}

export function parseString (data : string) {
    const text = data ?? text1; // fallback to text1 if empty

    // split into words
    const words = text.split(/\s+/).filter(Boolean);

    // character frequency map
    const freq: Record<string, number> = {};
    const keyFreq: Record<string, number> = {};

    for (const char of text) {
        freq[char] = freq[char] || 0;
        freq[char]++;

        const keyInfo = charToKeys[char];
        if (!keyInfo)
        {
            console.warn("Missing char in keymap:", char);
            continue;
        }
        keyFreq[charToKeys[char].code] = keyFreq[charToKeys[char].code] || 0;
        keyFreq[charToKeys[char].code] ++;

    }

    return {
        text,
        words,
        freq,
        keyFreq
    };
}

// Might need to change to also handle cvs or texts from url
async function parseFile(file : File) {
    const text = await file.text();
    return parseString(text);
}



// Created using LLM magic
export const charToKeys: Record<string, keyType> = {
    // Letters
    "a": { code: "KeyA" },
    "b": { code: "KeyB" },
    "c": { code: "KeyC" },
    "d": { code: "KeyD" },
    "e": { code: "KeyE" },
    "f": { code: "KeyF" },
    "g": { code: "KeyG" },
    "h": { code: "KeyH" },
    "i": { code: "KeyI" },
    "j": { code: "KeyJ" },
    "k": { code: "KeyK" },
    "l": { code: "KeyL" },
    "m": { code: "KeyM" },
    "n": { code: "KeyN" },
    "o": { code: "KeyO" },
    "p": { code: "KeyP" },
    "q": { code: "KeyQ" },
    "r": { code: "KeyR" },
    "s": { code: "KeyS" },
    "t": { code: "KeyT" },
    "u": { code: "KeyU" },
    "v": { code: "KeyV" },
    "w": { code: "KeyW" },
    "x": { code: "KeyX" },
    "y": { code: "KeyY" },
    "z": { code: "KeyZ" },

    // Uppercase letters (Shift)
    "A": { code: "KeyA", shift: true },
    "B": { code: "KeyB", shift: true },
    "C": { code: "KeyC", shift: true },
    "D": { code: "KeyD", shift: true },
    "E": { code: "KeyE", shift: true },
    "F": { code: "KeyF", shift: true },
    "G": { code: "KeyG", shift: true },
    "H": { code: "KeyH", shift: true },
    "I": { code: "KeyI", shift: true },
    "J": { code: "KeyJ", shift: true },
    "K": { code: "KeyK", shift: true },
    "L": { code: "KeyL", shift: true },
    "M": { code: "KeyM", shift: true },
    "N": { code: "KeyN", shift: true },
    "O": { code: "KeyO", shift: true },
    "P": { code: "KeyP", shift: true },
    "Q": { code: "KeyQ", shift: true },
    "R": { code: "KeyR", shift: true },
    "S": { code: "KeyS", shift: true },
    "T": { code: "KeyT", shift: true },
    "U": { code: "KeyU", shift: true },
    "V": { code: "KeyV", shift: true },
    "W": { code: "KeyW", shift: true },
    "X": { code: "KeyX", shift: true },
    "Y": { code: "KeyY", shift: true },
    "Z": { code: "KeyZ", shift: true },

    // Digits + Shift equivalents
    "0": { code: "Digit0" },
    "1": { code: "Digit1" },
    "2": { code: "Digit2" },
    "3": { code: "Digit3" },
    "4": { code: "Digit4" },
    "5": { code: "Digit5" },
    "6": { code: "Digit6" },
    "7": { code: "Digit7" },
    "8": { code: "Digit8" },
    "9": { code: "Digit9" },

    ")": { code: "Digit0", shift: true },
    "!": { code: "Digit1", shift: true },
    "@": { code: "Digit2", shift: true },
    "#": { code: "Digit3", shift: true },
    "$": { code: "Digit4", shift: true },
    "%": { code: "Digit5", shift: true },
    "^": { code: "Digit6", shift: true },
    "&": { code: "Digit7", shift: true },
    "*": { code: "Digit8", shift: true },
    "(": { code: "Digit9", shift: true },

    // Punctuation
    " ": { code: "Space" },
    "\t": { code: "Tab" },
    "\n": { code: "Enter" },

    ";": { code: "Semicolon" },
    ":": { code: "Semicolon", shift: true },

    "'": { code: "Quote" },
    "\"": { code: "Quote", shift: true },

    ",": { code: "Comma" },
    "<": { code: "Comma", shift: true },

    ".": { code: "Period" },
    ">": { code: "Period", shift: true },

    "/": { code: "Slash" },
    "?": { code: "Slash", shift: true },

    "[": { code: "BracketLeft" },
    "{": { code: "BracketLeft", shift: true },

    "]": { code: "BracketRight" },
    "}": { code: "BracketRight", shift: true },

    "\\": { code: "Backslash" },
    "|": { code: "Backslash", shift: true },

    "`": { code: "Backquote" },
    "~": { code: "Backquote", shift: true },

    "=": { code: "Equal" },
    "+": { code: "Equal", shift: true },

    "-": { code: "Minus" },
    "_": { code: "Minus", shift: true },
};
