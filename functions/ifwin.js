import { reset, checkWin, checkTie, enableClick, disableClick } from "./basics.js";

export function ifwin(list, color, otherlist, winner, playgrid, u1wins, u2wins) {

    const mainContainer = document.getElementById("main")
    const resettimer = document.getElementById("resettimer")
    const P1winCount = document.getElementById("Player-1-wins")
    const P2winCount = document.getElementById("Player-2-wins")

    let mainContainerBackground = "linear-gradient(rgb(181 228 197), rgb(140 158 169))"


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
        }, 2000);
    }

    if (checkWin(list)) {
        mainContainer.style.background = color;
        if (winner == 1) {
            // u1wins += 1
            // P1winCount.innerHTML = u1wins
            const wincount = parseInt(P1winCount.innerHTML) 
            P1winCount.innerHTML = wincount+1
        } else {
            // u2wins += 1
            // P2winCount.innerHTML = u2wins
            const wincount = parseInt(P2winCount.innerHTML) 
            P2winCount.innerHTML = wincount+1
        }
        routineOnWinOrTie()
        return true
    } else if (checkTie(list, otherlist)) {
        mainContainer.style.background = "white"
        routineOnWinOrTie()
        return true
    } else {
        return false
    }
}