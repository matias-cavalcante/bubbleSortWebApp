
let inputNumbers = document.getElementById("userInput");
const sortButton = document.getElementById("checkNumbers");
const numbContainer = document.getElementById("number-container");
const timerClock = document.getElementById("timer");
const reloadPage = document.getElementById("loadAgain")

reloadPage.addEventListener("click", function() {
    setTimeout(function(){
        location.reload();
    }, 500);
});

inputNumbers.addEventListener("keyup", function(){
    let lastInput = inputNumbers.value.split('')[inputNumbers.value.length-1]
    let littleBox = document.createElement("div");
    littleBox.classList.add("number-boxes");
    littleBox.innerText = lastInput;
    numbContainer.appendChild(littleBox);
});

let userArray = null;

sortButton.addEventListener("click", function(){
    userArray = inputNumbers.value.split('').map(Number);
    sortArray(userArray, arraySortedYesNo, numbContainer, reviewInside, updateClock, timerClock, reloadPage);
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
            reloj(maxTime,scr);
            resolve(maxTime);
        }, 1000 * plusTime)
    });
}

//Populate clock container with seconds and milliseconds
function paintLessOneSecond(counter, clockBox){
    let intervalId = setInterval(function() {
        counter++;
        if (counter >= 100) {
            clearInterval(intervalId);
            return;
        }
        updated = "00"  + ":" + counter.toString().padStart(2, "0");
        clockBox.innerText = updated;
    }, 10);
}

function paintSecondCase(counter, clockBox, timeStr){
    let intervalId = setInterval(function() {
        counter++;
        if (counter >= 101) {
            clearInterval(intervalId);
            updated = "0" + timeStr.substring(0,1) + ":" + "00";
            clockBox.innerText = updated;
            return;
        }else{
            updated = "0" + timeStr.substring(0,1) + ":" + counter.toString().padStart(2, "0");
            clockBox.innerText = updated;
        }  
    }, 10);
}

function paintThirdCase(counter, clockBox, timeStr){
    let intervalId = setInterval(function() {
        counter++;
        if (counter >= 101) {
            clearInterval(intervalId);
            updated = timeStr.substring(0,2) + ":" + "00";
            clockBox.innerText = updated;
            return;
        }else{
            updated = timeStr.substring(0,2) + ":" + counter.toString().padStart(2, "0");
            clockBox.innerText = updated;
        }
    }, 10);
}

function updateClock(time, clock) {
    let countTo99 = 0;
    let updated = "";
    let timeString = time.toString().padStart(4, "0");
    if (time < 1000){
        paintLessOneSecond(countTo99, clock)
    } else if (time > 1000 && time < 10000){
        paintSecondCase(countTo99, clock, timeString)
    } else if(time > 10000){
        paintThirdCase(countTo99, clock, timeString)
    }
}

//Main function organizing the array and controlling the display of the array while changing
function sortArray(array, checker, boxes, printer, watch, screen, rest){
    let start = performance.now(), plusTime = 0, maxElapsedTime = 0, promises = [];
    while(checker(array) === false){
        let pointer = 0;
        for(let num = 0; num < array.length; num++){
            for (let point = pointer; array[point] > array[point + 1]; point++){
                switchIndex(point, array)
                printerWithTimeout(boxes, point, plusTime, start, maxElapsedTime, watch, screen)
                plusTime++;
                promises.push(printerWithTimeout(boxes,printer, point, plusTime, start, maxElapsedTime, watch,screen)
                .then((newMaxTime) => {
                    maxElapsedTime = newMaxTime;
                }));
            }
            pointer++
        } 
    }
    Promise.all(promises).then(() => {
        rest.style.visibility = "visible";
    });
}







