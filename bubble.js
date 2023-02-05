
let inputNumbers = document.getElementById("userInput");
const checkButton = document.getElementById("checkNumbers");
const boxNumbers = document.getElementById("number-container");
const timerClock = document.getElementById("timer");
const clockImg = document.getElementById("clock");

let boxesReference = []



inputNumbers.addEventListener("keyup", function(){
    let lastInput = inputNumbers.value.split('')[inputNumbers.value.length-1]
    let littleBox = document.createElement("div");
    littleBox.classList.add("number-boxes");
    littleBox.innerText = lastInput;
    boxNumbers.appendChild(littleBox);
    boxesReference.push(littleBox);
});


let userArray = null;

checkButton.addEventListener("click", function(){
    userArray = inputNumbers.value.split('').map(Number);
    let result = sortArray(userArray, arraySortedYesNo, boxNumbers, reviewInside, fillTimer, timerClock);
})


function reviewInside(objectBox, w){
    let bridge = objectBox.children[w].innerText;
    objectBox.children[w].innerText = objectBox.children[w+1].innerText
    objectBox.children[w+1].innerText = bridge

    objectBox.children[w+1].classList.add("orange-paint");
    setTimeout(()=>{
        objectBox.children[w+1].classList.remove("orange-paint");
    }, 1000)
}

//Bubble sort algorithm functions

function arraySortedYesNo(uncertain){
    for (before = 0; before < uncertain.length; before++){
        if (uncertain[before] > uncertain[before+1]){
            return false
        }
    }
    return true
}

function switchIndex(ind, elements){
    let bridge = elements[ind]
    elements[ind] = elements[ind+1]
    elements[ind+1] = bridge
}

function printerWithTimeout(boxes, print, point, plusTime, start, maxTime, reloj, scr) {
    return new Promise((resolve) => {
        setTimeout(()=>{
            print(boxes, point)
            let end = performance.now();
            let elapsedTime = end - start;
            if (elapsedTime > maxTime) {
                maxTime = elapsedTime;
            }
            reloj(maxTime, elapsedTime, scr);
            resolve(maxTime);
        }, 700 * plusTime)
    });
}

function fillTimer(time, newTime, display){
    let timeStr = time.toString()
    let newTimeStr = newTime.toString()
    let updateTime = "0";

    if (timeStr.length === 3 || timeStr.length === 4){
        for (let dig = 0; dig < timeStr.length; dig++){
            if (timeStr.length ===4 && timeStr[dig-1] != newTimeStr[dig-1]){
                updateTime = updateTime + newTimeStr[dig];
            }else{
                updateTime = updateTime + timeStr[dig]
            }
        }
        updateTime = updateTime.substring(0, 2) + ":" + updateTime.substring(2, updateTime.length-1);
        display.innerText = updateTime;
        display.classList.add("timer")
    }else if(timeStr.length === 5){
        for (let dig = 0; dig < timeStr.length; dig++){
            if (timeStr[dig] != newTimeStr[dig]){
                updateTime = updateTime + newTimeStr[dig];
            }else{
                updateTime = updateTime + timeStr[dig]
            }
        }
        updateTime = updateTime.substring(1, 3) + ":" + updateTime.substring(3, updateTime.length-1);
        display.innerText = updateTime;
        display.classList.add("timer")
    }
}


function sortArray(array, checker, boxes, printer, watch, screen){
    let start = performance.now(), plusTime = 0, maxElapsedTime = 0, promises = [];
    while(checker(array) === false){
        let pointer = 0;
        for(let num = 0; num < array.length; num++){
            for (let point = pointer; array[point] > array[point + 1]; point++){
                switchIndex(point, array)
                printerWithTimeout(boxes, point, plusTime, start, maxElapsedTime, watch, screen)
                plusTime++;
                promises.push(printerWithTimeout(boxes,printer, point, plusTime, start, maxElapsedTime, watch,screen).then((newMaxTime) => {
                    maxElapsedTime = newMaxTime;
                }));
            }
            pointer++
        } 
    }
    Promise.all(promises).then(() => {
        console.log("Max Time passed: ", (maxElapsedTime/1000).toFixed(1), " Array: ", array)
    });
    return array
}





//Graphic part functions





