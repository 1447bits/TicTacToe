import { GameInit } from "./functions/initgame.js"
const grid = document.getElementsByClassName("box")
const SP = document.getElementById("SP")
const DP = document.getElementById("DP")

let gamemode = 1

Game(gamemode)



function Game(mode) {
    if(mode === 1) {
        GameInit(grid, true)
    } else if (mode === 2) {
        GameInit(grid, false)
    } else {
        alert("gamemode unsuitable")
    }
}
