
export function paintBoxes(objectBox, w){
    let bridge = objectBox.children[w].innerText;
    objectBox.children[w].innerText = objectBox.children[w+1].innerText
    objectBox.children[w+1].innerText = bridge

    objectBox.children[w+1].classList.add("number-boxes-painter");
    setTimeout(()=>{
        objectBox.children[w+1].classList.remove("number-boxes-painter");
    }, 1000)
}

export function timedPainter(numbersBox, clock, twoMethods, index, plusTime, start, maxTime) {
    setTimeout(()=>{
        twoMethods[1](numbersBox, index)
        let end = performance.now() - start;
        if (end > maxTime) {
            maxTime = end;
        }
        twoMethods[2](maxTime,clock);
    }, 1000 * plusTime)
}