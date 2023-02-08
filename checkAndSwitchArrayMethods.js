

export function arraySortedYesNo(uncertain){
    for (let before = 0; before < uncertain.length; before++){
        if (uncertain[before] > uncertain[before+1]){
            return false
        }
    }
    return true
}

export function switchIndex(ind, elements){
    let bridge = elements[ind]
    elements[ind] = elements[ind+1]
    elements[ind+1] = bridge
}