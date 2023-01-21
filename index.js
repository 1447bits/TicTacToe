/* issues 
    after few playes computer click() function runs and unwanted moves are played 
*/


const resettimer = document.getElementById("resettimer")
const mainContainer = document.getElementById("main")
const gridfield = document.getElementsByClassName("box")
const P1txt = document.getElementById("Player-1-text")
const P2txt = document.getElementById("Player-2-text")

const grid = [
    document.getElementById("11"),
    document.getElementById("12"),
    document.getElementById("13"),
    document.getElementById("21"),
    document.getElementById("22"),
    document.getElementById("23"),
    document.getElementById("31"),
    document.getElementById("32"),
    document.getElementById("33")
]

const user1moves = []
const user2moves = []
let userclick = true

// enable and disable click functions
function enableClick() {
    grid.forEach((i) => {
        i.style["pointer-events"] = "all"
    })
}

function disableClick() {
    grid.forEach((i) => {
        i.style["pointer-events"] = "none"
    })
}

// check win function
function checkWin(list) {
    if (list.indexOf("11") != -1 && list.indexOf("12") != -1 && list.indexOf("13") != -1) { return true }
    else if (list.indexOf("21") != -1 && list.indexOf("22") != -1 && list.indexOf("23") != -1) { return true }
    else if (list.indexOf("31") != -1 && list.indexOf("32") != -1 && list.indexOf("33") != -1) { return true }
    else if (list.indexOf("11") != -1 && list.indexOf("21") != -1 && list.indexOf("31") != -1) { return true }
    else if (list.indexOf("12") != -1 && list.indexOf("22") != -1 && list.indexOf("32") != -1) { return true }
    else if (list.indexOf("13") != -1 && list.indexOf("23") != -1 && list.indexOf("33") != -1) { return true }
    else if (list.indexOf("11") != -1 && list.indexOf("22") != -1 && list.indexOf("33") != -1) { return true }
    else if (list.indexOf("13") != -1 && list.indexOf("22") != -1 && list.indexOf("31") != -1) { return true }
    else { return false }
}

// reset grid function
function reset(list) {
    list.forEach((i) => {
        i.style["background-color"] = "white"
    })
}

// play function initialised
var play = (pos) => {
    return
}


// change play Mode
// event Single player
document.getElementById("SP").addEventListener("click", (e) => {
    document.getElementById("turnDisplay").style.display = "none"
    document.getElementById("SP").style.background = "#59b8e8"
    document.getElementById("DP").style.background = "transparent"

    changePlayMode(1)

    reset(grid)
})
// event Double player
document.getElementById("DP").addEventListener("click", () => {
    document.getElementById("turnDisplay").style.display = "flex"
    document.getElementById("DP").style.background = "#59b8e8"
    document.getElementById("SP").style.background = "transparent"
    changePlayMode(2)
})
// initially game starts in 2 player
document.getElementById("DP").click()

// initialise each box in grid
reset(grid)

P1txt.style["background-color"] = " #d9effd "

// click event for each box in grid
// we will modify play function according to our playmode 1p or 2p
const boxes = document.getElementsByClassName("box")
for (box of boxes) {
    box.addEventListener("click", (e) => {
        play(e.target)
    })
}


function changePlayMode(playMode) {

    // double player
    if (playMode == 2) {

        // --------------------
        document.getElementById("message").style.display = "none"
        // --------------------

        let moveNo = 2

        play = (pos) => {
            if (pos.style["background-color"] === "white") {
                if (moveNo % 2 === 0) {
                    pos.style["background-color"] = "#87b7eb";
                    user1moves.push(pos.dataset.id)

                    moveNo += 1

                    // switch player move display
                    P1txt.style["background-color"] = " #ffffff "
                    P2txt.style["background-color"] = " #ffe5b4 "

                } else {
                    pos.style["background-color"] = "#ffaf12";
                    user2moves.push(pos.dataset.id)

                    moveNo += 1

                    // switch player move display
                    P1txt.style["background-color"] = " #d9effd "
                    P2txt.style["background-color"] = " #ffffff "
                }
            }

            // // play undo condition (🤫 its cheating) 
            // else {
            //     box.style["background-color"] = "white";
            // }

            win1 = checkWin(user1moves)
            win2 = checkWin(user2moves)
            Tie = user1moves.length + user2moves.length === 9
            if (win1 || win2 || Tie) {

                disableClick()

                // display winner
                if (win1) {
                    mainContainer.style["background-color"] = "#89d1ff";
                    P2txt.style.display = "none"
                    P1txt.style.transform = "scale(2)";
                    P1txt.style.background = "transparent";
                } else if (win2) {
                    mainContainer.style["background-color"] = "#ffc960";
                    P1txt.style.display = "none"
                    P2txt.style.transform = "scale(2)";
                    P2txt.style.background = "transparent";

                } else {
                    mainContainer.style["background-color"] = "#EBEBEB";
                    P1txt.style.display = "none"
                    P2txt.style.display = "none"
                }

                // resetTimer countDown
                let i = 0
                setInterval(() => {
                    i += 1
                    if (i >= 4) {
                        return
                    }
                    resettimer.innerHTML = (3 - i) + " s"
                }, 980)

                // add delay to reset
                setTimeout(() => {
                    reset(grid)
                    enableClick()
                    mainContainer.style["background-color"] = "transparent";
                    P1txt.style.display = "flex"
                    P2txt.style.display = "flex"
                    P1txt.style.transform = "scale(1)"
                    P2txt.style.transform = "scale(1)"


                }, 3000)

                // empty usermoves arrays
                user1moves.length = 0
                user2moves.length = 0
            }
        }
    }

    // single player
    else if (playMode == 1) {

        // --------------------
        document.getElementById("message").style.display = ""
        // --------------------

        reset(grid)
        user1moves.length = 0
        user2moves.length = 0
        var availmoves = []
        for (let i = 0; i < grid.length; i++) {
            availmoves.push(grid[i].dataset.id)
        }

        play = (pos) => {

            // console.log("moveNo : ", moveNo)

            // play only if box is not already colored i.e played
            if (pos.style["background-color"] === "white") {
                // if (moveNo === 0) {
                if (userclick) {
                    pos.style["background-color"] = "#87b7eb";
                    user1moves.push(pos.dataset.id)

                    // next move comp move
                    userclick = false

                    // delete played move from available moves array
                    availmoves.splice(availmoves.indexOf(pos.dataset.id), 1)
                    console.log("You played : ", availmoves)

                    let random = Math.floor(Math.random() * availmoves.length);
                    setTimeout(() => {
                        document.getElementById(availmoves[random]).click()
                    }, 100)

                } else {
                    pos.style["background-color"] = "#ffaf12";
                    user2moves.push(pos.dataset.id)

                    // next move user move
                    userclick = true

                    // delete played move from available moves array
                    availmoves.splice(availmoves.indexOf(pos.dataset.id), 1)
                    console.log("i played : ", availmoves)

                }
            }
            else {
                return
            }


            win1 = checkWin(user1moves)
            win2 = checkWin(user2moves)
            Tie = user1moves.length + user2moves.length === 9
            if (win1 || win2 || Tie) {

                disableClick()
                availmoves.length = 0
                for (let i = 0; i < grid.length; i++) {
                    availmoves.push(grid[i].dataset.id)
                }
                userclick = true

                // display winner
                if (win1) {
                    mainContainer.style["background-color"] = "#89d1ff";
                } else if (win2) {
                    mainContainer.style["background-color"] = "#ffc960";
                } else {
                    mainContainer.style["background-color"] = "#EBEBEB";
                }

                // resetTimer countDown
                let i = 0
                setInterval(() => {
                    i += 1
                    if (i >= 4) {
                        return
                    }
                    resettimer.innerHTML = (3 - i) + " s"
                }, 980)

                // add delay to reset
                setTimeout(() => {
                    reset(grid)
                    enableClick()
                    mainContainer.style["background-color"] = "transparent";
                }, 3000)

                // empty usermoves arrays
                user1moves.length = 0
                user2moves.length = 0
            }
        }
    }
    else {
        alert("error playmode is Nother 1 Nor 2")
    }
}


