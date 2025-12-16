// Dvorak keyboard layout

export let staggeredDvorak = [
    [
        {
            key: ["`", "~"],
            code: "Backquote"
        },
        {
            key: ["!", "1"],
            code: "Digit1"
        },
        {
            key: ["@", "2"],
            code: "Digit2"
        },
        {
            key: ["#", "3"],
            code: "Digit3"
        },
        {
            key: ["$", "4"],
            code: "Digit4"
        },
        {
            key: ["%", "5"],
            code: "Digit5"
        },
        {
            key: ["^", "6"],
            code: "Digit6"
        },
        {
            key: ["&", "7"],
            code: "Digit7"
        },
        {
            key: ["*", "8"],
            code: "Digit8"
        },
        {
            key: ["(", "9"],
            code: "Digit9"
        },
        {
            key: [")", "0"],
            code: "Digit0"
        },
        {
            key: ["{", "["],
            code: "Minus"
        },
        {
            key: ["}", "]"],
            code: "Equal"
        },
        {
            key: ["Backspace"],
            code: "Backspace",
            size: 2,
            legend: {
                position: "center"
            }
        }
    ],
    [
        {
            key: ["Tab"],
            code: "Tab",
            size: 1.5
        },
        {
            key: ['"', "'"],
            code: "Quote"
        },
        {
            key: ["<", ","],
            code: "Comma"
        },
        {
            key: [">", "."],
            code: "Period"
        },
        {
            key: ["P", "p"],
            code: "KeyP"
        },
        {
            key: ["Y", "y"],
            code: "KeyY"
        },
        {
            key: ["F", "f"],
            code: "KeyF"
        },
        {
            key: ["G", "g"],
            code: "KeyG"
        },
        {
            key: ["C", "c"],
            code: "KeyC"
        },
        {
            key: ["R", "r"],
            code: "KeyR"
        },
        {
            key: ["L", "l"],
            code: "KeyL"
        },
        {
            key: ["?", "/"],
            code: "Slash"
        },
        {
            key: ["+", "="],
            code: "Equal"
        },
        {
            key: ["|", "\\"],
            code: "Backslash",
            size: 1.5
        }
    ],
    [
        {
            key: ["Caps"],
            code: "CapsLock",
            size: 1.75
        },
        {
            key: ["A", "a"],
            code: "KeyA"
        },
        {
            key: ["O", "o"],
            code: "KeyO"
        },
        {
            key: ["E","e"],
            code: "KeyE"
        },
        {
            key: ["U", "u"],
            code: "KeyU",
            homing: true
        },
        {
            key: ["I", "i"],
            code: "KeyI"
        },
        {
            key: ["D", "d"],
            code: "KeyD"
        },
        {
            key: ["H", "h"],
            code: "KeyH",
            homing: true
        },
        {
            key: ["T", "t"],
            code: "KeyT"
        },
        {
            key: ["N", "n"],
            code: "KeyN"
        },
        {
            key: ["S", "s"],
            code: "KeyS"
        },
        {
            key: ["_", "-"],
            code: "Minus"
        },
        {
            key: ["Enter"],
            code: "Enter",
            size: 2.25
        }
    ],
    [
        {
            key: ["Shift"],
            code: "ShiftLeft",
            size: 2.25
        },
        {
            key: [":", ";"],
            code: "Semicolon"
        },
        {
            key: ["Q", "q"],
            code: "KeyQ"
        },
        {
            key: ["J", "j"],
            code: "KeyJ"
        },
        {
            key: ["K", "k"],
            code: "KeyK"
        },
        {
            key: ["X", "x"],
            code: "KeyX"
        },
        {
            key: ["B", "b"],
            code: "KeyB"
        },
        {
            key: ["M", "m"],
            code: "KeyM"
        },
        {
            key: ["W", "w"],
            code: "KeyW"
        },
        {
            key: ["V", "v"],
            code: "KeyV"
        },
        {
            key: ["Z", "z"],
            code: "KeyZ"
        },
        {
            key: ["Shift"],
            code: "ShiftRight",
            size: 2.75
        }
    ],
    [
        {
            key: ["Ctrl"],
            code: "ControlLeft",
            size: 1.25
        },
        {
            key: ["Cmd/Win"],
            code: "MetaLeft",
            size: 1.25
        },
        {
            key: ["Alt"],
            code: "AltLeft",
            size: 1.25
        },
        {
            key: [""],
            code: "Space",
            size: 6.5
        },
        {
            key: ["Alt"],
            code: "AltRight",
            size: 1.25
        },
        {
            key: ["Cmd/Win"],
            code: "MetaRight",
            size: 1.25
        },
        {
            key: ["Meta"],
            code: "ContextMenu",
            size: 1.25
        },
        {
            key: ["Ctrl"],
            code: "ControlRight",
            size: 1.25
        }
    ],
];

export let matrixDvorak = [
    [
        {
            key: ["`", "~"],
            code: "Backquote"
        },
        {
            key: ["!", "1"],
            code: "Digit1"
        },
        {
            key: ["@", "2"],
            code: "Digit2"
        },
        {
            key: ["#", "3"],
            code: "Digit3"
        },
        {
            key: ["$", "4"],
            code: "Digit4"
        },
        {
            key: ["%", "5"],
            code: "Digit5"
        },
        {
            key: ["^", "6"],
            code: "Digit6"
        },
        {
            key: ["&", "7"],
            code: "Digit7"
        },
        {
            key: ["*", "8"],
            code: "Digit8"
        },
        {
            key: ["(", "9"],
            code: "Digit9"
        },
        {
            key: [")", "0"],
            code: "Digit0"
        },
        {
            key: ["Bksp"],
            code: "Backspace",
            size: 1
        }
    ],
    [
        {
            key: ["Tab"],
            code: "TabLeft",
            size: 1
        },
        {
            key: ['"'],
            code: "Quote"
        },
        {
            key: ["<"],
            code: "Comma"
        },
        {
            key: [">"],
            code: "Period"
        },
        {
            key: ["P"],
            code: "KeyP"
        },
        {
            key: ["Y"],
            code: "KeyY"
        },
        {
            key: ["F"],
            code: "KeyF"
        },
        {
            key: ["G"],
            code: "KeyG"
        },
        {
            key: ["C"],
            code: "KeyC"
        },
        {
            key: ["R"],
            code: "KeyR"
        },
        {
            key: ["L"],
            code: "KeyL"
        },
        {
            key: ["|", "\\"],
            code: "Backslash",
            size: 1
        }
    ],
    [
        {
            key: ["Caps"],
            code: "CapsLock",
            size: 1
        },
        {
            key: ["A"],
            code: "KeyA"
        },
        {
            key: ["O"],
            code: "KeyO"
        },
        {
            key: ["E"],
            code: "KeyE"
        },
        {
            key: ["U"],
            code: "KeyU",
            homing: true
        },
        {
            key: ["I"],
            code: "KeyI"
        },
        {
            key: ["D"],
            code: "KeyD"
        },
        {
            key: ["H"],
            code: "KeyH",
            homing: true
        },
        {
            key: ["T"],
            code: "KeyT"
        },
        {
            key: ["N"],
            code: "KeyN"
        },
        {
            key: ["S"],
            code: "KeyS"
        },
        {
            key: ["Entr"],
            code: "Enter",
            size: 1
        }
    ],
    [
        {
            key: ["Shft"],
            code: "ShiftLeft",
            size: 1
        },
        {
            key: [":"],
            code: "Semicolon"
        },
        {
            key: ["Q"],
            code: "KeyQ"
        },
        {
            key: ["J"],
            code: "KeyJ"
        },
        {
            key: ["K"],
            code: "KeyK"
        },
        {
            key: ["X"],
            code: "KeyX"
        },
        {
            key: ["B"],
            code: "KeyB"
        },
        {
            key: ["M"],
            code: "KeyM"
        },
        {
            key: ["W"],
            code: "KeyW"
        },
        {
            key: ["V"],
            code: "KeyV"
        },
        {
            key: ["Z"],
            code: "KeyZ"
        },
        {
            key: ["Shft"],
            code: "ShiftRight",
            size: 1
        }
    ],
    [
        {
            key: ["Ctrl"],
            code: "ControlLeft",
            size: 1
        },
        {
            key: ["Win"],
            code: "MetaLeft",
            size: 1
        },
        {
            key: ["Supr"],
            size: 1
        },
        {
            key: ["Alt"],
            code: "AltLeft",
            size: 1
        },
        {
            key: ["Lowr"],
            size: 1
        },
        {
            key: [""],
            code: "Space",
            size: 2.1
        },
        {
            key: ["Uppr"],
            size: 1
        },
        {
            key: ["Alt"],
            code: "AltRight",
            size: 1
        },
        {
            key: ["Win"],
            code: "MetaRight",
            size: 1
        },
        {
            key: ["Meta"],
            code: "ContextMenu",
            size: 1
        },
        {
            key: ["Ctrl"],
            code: "ControlRight",
            size: 1
        }
    ],
];
