import { GameInit } from "./functions/initgame.js"
const grid = document.getElementsByClassName("box")
const SP = document.getElementById("SP")
const DP = document.getElementById("DP")

let gamemode = parseInt(localStorage.getItem("mode"))

SP.addEventListener("click", () => {
    localStorage.setItem("mode", 1)
    location.reload();
})
DP.addEventListener("click", () => {
    localStorage.setItem("mode", 2)
    location.reload();
})


Game(gamemode)

function Game(mode) {
    if (mode === 1) {
        GameInit(grid, true)
        SP.classList.add("activePlayMode")
        DP.classList.remove("activePlayMode")
    } else if (mode === 2) {
        GameInit(grid, false)
        SP.classList.remove("activePlayMode")
        DP.classList.add("activePlayMode")
    } else {
        localStorage.setItem("mode", 1)
        location.reload()
    }
}
