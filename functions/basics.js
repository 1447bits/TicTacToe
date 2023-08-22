// check win function
export function checkWin(list) {
    if (list.indexOf(1) != -1 && list.indexOf(2) != -1 && list.indexOf(3) != -1) { return true }
    else if (list.indexOf(4) != -1 && list.indexOf(5) != -1 && list.indexOf(6) != -1) { return true }
    else if (list.indexOf(7) != -1 && list.indexOf(8) != -1 && list.indexOf(9) != -1) { return true }
    else if (list.indexOf(1) != -1 && list.indexOf(4) != -1 && list.indexOf(7) != -1) { return true }
    else if (list.indexOf(2) != -1 && list.indexOf(5) != -1 && list.indexOf(8) != -1) { return true }
    else if (list.indexOf(3) != -1 && list.indexOf(6) != -1 && list.indexOf(9) != -1) { return true }
    else if (list.indexOf(1) != -1 && list.indexOf(5) != -1 && list.indexOf(9) != -1) { return true }
    else if (list.indexOf(3) != -1 && list.indexOf(5) != -1 && list.indexOf(7) != -1) { return true }
    else { return false }
}

// check tie function 
export function checkTie(list1, list2) {
    if (list1.length + list2.length === 9) {
        return true
    } else { return false }
}

// enable and disable click for the elements in the array list
export function enableClick(list) {
    for (let i = 0; i < list.length; i++) {
        list[i].style["pointer-events"] = "all"
    }
}

export function disableClick(list) {
    for (let i = 0; i < list.length; i++) {
        list[i].style["pointer-events"] = "none"
}
}

// reset grid function
export function reset(list) {
    for (let i = 0; i < list.length; i++) {
        list[i].style.background = "#000000e0"
        list[i].dataset.played = 0
    }
}

export function clickToPlay(pos, grid) {
    setTimeout(() => {
        enableClick(grid)
        grid[pos].click()
        return true
    }, 200);
}
