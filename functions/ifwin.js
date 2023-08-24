import { reset, checkWin, checkTie, enableClick, disableClick } from "./basics.js";

export function ifwin(list, otherlist, winner, playgrid) {

    const reset_bar = document.getElementById("reset")
    const P1winCount = document.getElementById("Player-1-wins")
    const P2winCount = document.getElementById("Player-2-wins")


    function routineAfterWinOrTie() {
        let i = 2
        const counterInternal = setInterval(() => {
            reset_bar.style.width = "80%"
            reset_bar.style.opacity = "1"
            i -= 0.02
        }, 20);
        disableClick(playgrid)
        setTimeout(() => {
            reset(playgrid)
            clearInterval(counterInternal)
            reset_bar.style.width = "10%"
            reset_bar.style.opacity = "0.2"
            enableClick(playgrid)
        }, 2000);
    }

    if (checkWin(list)) {
        if (winner == 1) {
            const wincount = parseInt(P1winCount.innerHTML)
            P1winCount.innerHTML = wincount + 1
        } else {
            const wincount = parseInt(P2winCount.innerHTML)
            P2winCount.innerHTML = wincount + 1
        }
        routineAfterWinOrTie()
        return true
    } else if (checkTie(list, otherlist)) {
        routineAfterWinOrTie()
        return true
    } else {
        return false
    }
}