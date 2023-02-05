
let inputNumbers = document.getElementById("userInput");
const checkButton = document.getElementById("checkNumbers");
const boxNumbers = document.getElementById("number-container");
const timerClock = document.getElementById("timer");
const reload = document.getElementById("loadAgain")

let boxesReference = []

reload.addEventListener("click", function() {
    location.reload();
});

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
    let result = sortArray(userArray, arraySortedYesNo, boxNumbers, reviewInside, updateClock, timerClock, reload);
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
/*
function updateClock(time, clock) {
    let countTo99 = 0;
    let updated = "";

    let timeString = time.toString().padStart(4, "0");
    if (time < 1000) {
        updated = "00:" + timeString.substring(0,2);
    } else if (time > 1000 && time < 10000){
        updated = "0" + timeString.substring(0,1) + ":" + timeString.substring(1,3);
    }else if (time > 10000){
        updated = timeString.substring(0,2) + ":" + timeString.substring(2,4)
    }
    clock.innerText = "00:"+updated;    
}*/


function updateClock(time, clock) {
    let countTo99 = 0;
    let updated = "";
    let timeString = time.toString().padStart(4, "0");

    if (time < 1000){
        let intervalId = setInterval(function() {
            countTo99++;
            if (countTo99 >= 100) {
                clearInterval(intervalId);
                return;
            }
            updated = "00"  + ":" + countTo99.toString().padStart(2, "0");
            clock.innerText = updated;
        }, 10);
    } else if (time > 1000 && time < 10000){
        let intervalId = setInterval(function() {
            countTo99++;
            if (countTo99 >= 100) {
                clearInterval(intervalId);
                return;
            }
            updated = "0" + timeString.substring(0,1) + ":" + countTo99.toString().padStart(2, "0");
            clock.innerText = updated;
        }, 10);
    } else if(time > 10000){
        let intervalId = setInterval(function() {
            countTo99++;
            if (countTo99 >= 100) {
                clearInterval(intervalId);
                return;
            }
            updated = timeString.substring(0,2) + ":" + countTo99.toString().padStart(2, "0");
            clock.innerText = updated;
        }, 10);
    }
}

  
function sortArray(array, checker, boxes, printer, watch, screen, rest){
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
        rest.style.visibility = "visible";

    });


    
    return array
}





//Graphic part functions





