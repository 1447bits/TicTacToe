// check win function
export function checkWin(list) {
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
