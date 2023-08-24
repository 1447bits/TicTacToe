import { enableClick, clickToPlay } from "./basics.js";

export function compPlay(oppmoves, thisUserMoves, playgrid) {

    function getRandomIndexFromArray(array) {
        if (array.length === 0) { return -1; }
        return Math.floor(Math.random() * array.length);
    }

    function findUncommonElement(A, B) {

        const commonElements = A.filter(element => B.includes(element));

        if (commonElements.length === 2) {
            for (const element of A) {
                if (!commonElements.includes(element)) {
                    return element;
                }
            }
        }
    }

    function checkTriad(list, availPlays) {
        let best = []
        let arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]
        arr.forEach((triadList) => {
            let elemfound = findUncommonElement(triadList, list)
            if (elemfound !== undefined) {
                best.push(elemfound)
            }
        })
        if (best.length == 0) {
            // console.log("bestPlay is random")
            return [getRandomIndexFromArray(availPlays)]
        }
        return best

    }

    function findCommonNumbers(array1, array2) {
        return array1.filter(element => array2.includes(element));
    }

    function concatenateArraysWithoutRepeats(array1, array2) {
        const combinedSet = new Set([...array1, ...array2]);
        return Array.from(combinedSet);
    }

    // calculate available positions
    const availMoves = []
    for (let i = 1; i <= 9; i++) {
        if (!oppmoves.includes(i) && !thisUserMoves.includes(i)) {
            availMoves.push(i)
        }
    }

    if (oppmoves.length < 2) {
        // -1 coz indexes start from 0
        clickToPlay(availMoves[getRandomIndexFromArray(availMoves)] - 1, playgrid)
        return
    }
    else {
        let bestPlay = []
        // console.log("_______________________")
        // check colwin
        let bestPlayAgainst = checkTriad(oppmoves, availMoves)
        // console.log("bestPlayAgainst = ", bestPlayAgainst)
        let selfBestPlay = checkTriad(thisUserMoves, availMoves)
        // console.log("selfBestPlay = ", selfBestPlay)
        
        // if computer has played only 0 or 1 moves priority will be to block opponant not try win
        if (thisUserMoves.length < 2) {
            bestPlay = concatenateArraysWithoutRepeats(bestPlayAgainst, selfBestPlay)
        } else {
            bestPlay = concatenateArraysWithoutRepeats(selfBestPlay, bestPlayAgainst)
        }
        // console.log("concat bestPlay = ", bestPlay)

        let bestPlayPlayed = false
        bestPlay.forEach((bestMove) => {
            if (availMoves.indexOf(bestMove) != -1) {
                // console.log("bestplay against user with best move = ", bestMove)
                // console.log("and best play = ", bestPlay)
                // console.log("where oppmoves = ", oppmoves)
                // console.log("where thisusermoves = ", thisUserMoves)
                if (!bestPlayPlayed) {
                    clickToPlay(bestMove - 1, playgrid)
                }
                bestPlayPlayed = true
                return
            }
        })
        if (!bestPlayPlayed) {
            // console.log("not bestPlayed")
            bestPlay = checkTriad(thisUserMoves, availMoves)
            let bestPlayPlayed = false
            bestPlay.forEach((bestMove) => {
                if (availMoves.indexOf(bestMove) != -1) {
                    bestPlayPlayed = true
                    clickToPlay(bestMove - 1, playgrid)
                    return
                }
            })
            // console.log("playedrandom")
            clickToPlay(availMoves[getRandomIndexFromArray(availMoves)] - 1, playgrid)
            return
        }
    }
}