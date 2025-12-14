// Canadian French CSA keyboard layout

export let staggeredFRCSA = [
    [
        {
            key: ["|", "#"],
            code: "Backquote"
        },
        {
            key: ["!", "1"],
            code: "Digit1"
        },
        {
            key: ['"', "2"],
            code: "Digit2"
        },
        {
            key: ["/", "3"],
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
            key: ["?", "6"],
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
            key: ["_", "-"],
            code: "Minus"
        },
        {
            key: ["+", "="],
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
            key: ["Q", "q"],
            code: "KeyQ"
        },
        {
            key: ["W", "w"],
            code: "KeyW"
        },
        {
            key: ["E", "e"],
            code: "KeyE"
        },
        {
            key: ["R", "r"],
            code: "KeyR"
        },
        {
            key: ["T", "t"],
            code: "KeyT"
        },
        {
            key: ["Y", "y"],
            code: "KeyY"
        },
        {
            key: ["U", "u"],
            code: "KeyU"
        },
        {
            key: ["I", "i"],
            code: "KeyI"
        },
        {
            key: ["O", "o"],
            code: "KeyO"
        },
        {
            key: ["P", "p"],
            code: "KeyP"
        },
        {
            key: ["{", "^"],
            code: "BracketLeft"
        },
        {
            key: ["}", "¸"],
            code: "BracketRight"
        },
        {
            key: [">", "<"],
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
            key: ["S", "s"],
            code: "KeyS"
        },
        {
            key: ["D","d"],
            code: "KeyD"
        },
        {
            key: ["F", "f"],
            code: "KeyF",
            homing: true
        },
        {
            key: ["G", "g"],
            code: "KeyG"
        },
        {
            key: ["H", "h"],
            code: "KeyH"
        },
        {
            key: ["J", "j"],
            code: "KeyJ",
            homing: true
        },
        {
            key: ["K", "k"],
            code: "KeyK"
        },
        {
            key: ["L", "l"],
            code: "KeyL"
        },
        {
            key: [":", ";"],
            code: "Semicolon"
        },
        {
            key: ["~", "`"],
            code: "Quote"
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
            key: ["Z", "z"],
            code: "KeyZ"
        },
        {
            key: ["X", "x"],
            code: "KeyX"
        },
        {
            key: ["C", "c"],
            code: "KeyC"
        },
        {
            key: ["V", "v"],
            code: "KeyV"
        },
        {
            key: ["B", "b"],
            code: "KeyB"
        },
        {
            key: ["N", "n"],
            code: "KeyN"
        },
        {
            key: ["M", "m"],
            code: "KeyM"
        },
        {
            key: ["'", ","],
            code: "Comma"
        },
        {
            key: ['"', "."],
            code: "Period"
        },
        {
            key: ["É", "é"],
            code: "Slash"
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

export let matrix = [
    [
        {
            key: ["|", "#"],
            code: "Backquote"
        },
        {
            key: ["!", "1"],
            code: "Digit1"
        },
        {
            key: ['"', "2"],
            code: "Digit2"
        },
        {
            key: ["/", "3"],
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
            key: ["?", "6"],
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
            key: ["Q"],
            code: "KeyQ"
        },
        {
            key: ["W"],
            code: "KeyW"
        },
        {
            key: ["E"],
            code: "KeyE"
        },
        {
            key: ["R"],
            code: "KeyR"
        },
        {
            key: ["T"],
            code: "KeyT"
        },
        {
            key: ["Y"],
            code: "KeyY"
        },
        {
            key: ["U"],
            code: "KeyU"
        },
        {
            key: ["I"],
            code: "KeyI"
        },
        {
            key: ["O"],
            code: "KeyO"
        },
        {
            key: ["P"],
            code: "KeyP"
        },
        {
            key: [">", "<"],
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
            key: ["S"],
            code: "KeyS"
        },
        {
            key: ["D"],
            code: "KeyD"
        },
        {
            key: ["F"],
            code: "KeyF",
            homing: true
        },
        {
            key: ["G"],
            code: "KeyG"
        },
        {
            key: ["H"],
            code: "KeyH"
        },
        {
            key: ["J"],
            code: "KeyJ",
            homing: true
        },
        {
            key: ["K"],
            code: "KeyK"
        },
        {
            key: ["L"],
            code: "KeyL"
        },
        {
            key: [":", ";"],
            code: "Semicolon"
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
            key: ["Z"],
            code: "KeyZ"
        },
        {
            key: ["X"],
            code: "KeyX"
        },
        {
            key: ["C"],
            code: "KeyC"
        },
        {
            key: ["V"],
            code: "KeyV"
        },
        {
            key: ["B"],
            code: "KeyB"
        },
        {
            key: ["N"],
            code: "KeyN"
        },
        {
            key: ["M"],
            code: "KeyM"
        },
        {
            key: ["'", ","],
            code: "Comma"
        },
        {
            key: ['"', "."],
            code: "Period"
        },
        {
            key: ["É", "é"],
            code: "Slash"
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
