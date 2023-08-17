import { doublePlayerGameInit } from "./functions/twoPlayersFuncs.js"
import { singlePlayerGameInit } from "./functions/onePlayerFuncs.js"
const resettimer = document.getElementById("resettimer")
const mainContainer = document.getElementById("main")
const P1txt = document.getElementById("Player-1-text")
const P2txt = document.getElementById("Player-2-text")
const P1winCount = document.getElementById("Player-1-wins")
const P2winCount = document.getElementById("Player-2-wins")
const grid = document.getElementsByClassName("box")

let P1wins = 0
let P2wins = 0
let gamemode = 2

// turn true for player 1 false for player 2
let turn = true;

let playeerTurnTxtColor = "#d9effd"

let mainContainerBackground = "linear-gradient(rgb(181 228 197), rgb(140 158 169))"
let playModeOptionBorder = "rgb(18, 69, 56) 1px solid"

Game(gamemode)

function Game(mode) {
    if(mode === 1) {
        singlePlayerGameInit(grid)
    } else if (mode === 2) {
        doublePlayerGameInit(grid)
    } else {
        alert("gamemode unsuitable")
    }
}
