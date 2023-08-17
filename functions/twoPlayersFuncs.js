import { checkWin, checkTie, enableClick, disableClick, reset } from "./basics.js"
export function doublePlayerGameInit(playgrid) {
    const mainContainer = document.getElementById("main")
    const resettimer = document.getElementById("resettimer")
    const P1winCount = document.getElementById("Player-1-wins")
    const P2winCount = document.getElementById("Player-2-wins")


    let turn = true
    let player1Color = "#89d1ff"
    let player2Color = "#ffc960"
    let user1moves = []
    let user2moves = []
    let u1wins = 0
    let u2wins = 0
    let mainContainerBackground = "linear-gradient(rgb(181 228 197), rgb(140 158 169))"

    reset(playgrid)


    function ifwin(list, color, otherlist, winner) {

        function routineOnWinOrTie() {
            let i = 2
            const counterInternal = setInterval(() => {
                resettimer.innerHTML = i.toFixed(2) + "s"
                i -= 0.02
            }, 20);
            disableClick(playgrid)
            setTimeout(() => {
                mainContainer.style.background = mainContainerBackground
                reset(playgrid)
                clearInterval(counterInternal)
                resettimer.innerHTML = 0 + "s"
                enableClick(playgrid)
            }, 2050);
        }

        if (checkWin(list)) {
            mainContainer.style.background = color;
            user1moves.length = 0
            user2moves.length = 0
            if (winner == 1) {
                u1wins += 1
                P1winCount.innerHTML = u1wins
            } else {
                u2wins += 1
                P2winCount.innerHTML = u2wins
            }
            routineOnWinOrTie()
        } else if (checkTie(list, otherlist)) {
            user1moves.length = 0
            user2moves.length = 0
            mainContainer.style.background = "white"
            routineOnWinOrTie()
        }
    }

    for (let i = 0; i < playgrid.length; i++) {
        let elem = playgrid[i]
        elem.addEventListener("click", (e) => {
            e = e.target
            if (e.dataset.played == 0) {
                e.dataset.played = 1
                if (turn) {
                    e.style.background = player1Color
                    user1moves.push(e.id)
                    turn = !turn
                    ifwin(user1moves, player1Color, user2moves, 1)
                } else {
                    e.style.background = player2Color
                    user2moves.push(e.id)
                    turn = !turn
                    ifwin(user2moves, player2Color, user1moves, 2)
                }
            }
        })
    }
}