import { disableClick, enableClick, reset } from "./basics.js"
import { ifwin } from "./ifwin.js"
import { compPlay } from "./compPlay.js"

export function GameInit(playgrid, singleplayer) {

    const P1txt = document.getElementById("Player-1-text")
    const P2txt = document.getElementById("Player-2-text")

    let turn = true
    let player1Color = "#89d1ff"
    let player2Color = "#ffc960"
    let user1moves = []
    let user2moves = []
    let playeerTurnTxtColor = "#d9effd"


    let u1wins = 0
    let u2wins = 0

    reset(playgrid)

    for (let i = 0; i < playgrid.length; i++) {
        let elem = playgrid[i]
        elem.addEventListener("click", (e) => {
            e = e.target
            if (e.dataset.played == 0) {
                e.dataset.played = 1
                if (turn) {
                    e.style.background = player1Color
                    user1moves.push(parseInt(e.dataset.id))
                    P2txt.style.background = playeerTurnTxtColor
                    P1txt.style.background = "transparent"

                    if (ifwin(user1moves, player1Color, user2moves, 1, playgrid, u1wins, u2wins)) {
                        user1moves.length = 0
                        user2moves.length = 0
                        u1wins++
                        singleplayer ? turn = false : turn = turn;
                    }
                    else if (singleplayer) {
                        disableClick(playgrid)
                        setTimeout(() => {
                            compPlay(user1moves, user2moves, playgrid)  
                        }, 500);
                    }

                    turn = !turn
                } else {
                    e.style.background = player2Color
                    user2moves.push(parseInt(e.dataset.id))
                    P1txt.style.background = playeerTurnTxtColor
                    P2txt.style.background = "transparent"

                    if (ifwin(user2moves, player2Color, user1moves, 2, playgrid, u1wins, u2wins)) {
                        user1moves.length = 0
                        user2moves.length = 0
                        u2wins++
                        singleplayer ? turn = false : turn = turn;
                    }

                    turn = !turn
                }
            }
        })
    }
}