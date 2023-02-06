
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

let sortArrayObjects = [
    numbContainer, timerClock, reloadPage
]

let sortArrayMethods = [arraySortedYesNo, paintBoxes, updateClock]

sortButton.addEventListener("click", function(){
    userArray = inputNumbers.value.split('').map(Number);
    sortArrayObjects.push(userArray)
    sortArray(sortArrayObjects, sortArrayMethods);

    sortButton.classList.add("fadeOut");
    setTimeout(function() {
    sortButton.style.display = "none";
  }, 1000);
})

function paintBoxes(objectBox, w){
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

/*
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
}*/


//function printerWithTimeout(boxes, print, point, plusTime, start, maxTime, reloj, scr)
function printerWithTimeout( boxes, methods, point, plusTime, start, maxTime, scr) {
    return new Promise((resolve) => {
        setTimeout(()=>{
            methods[1](boxes, point)
            let end = performance.now();
            let elapsedTime = end - start;
            if (elapsedTime > maxTime) {
                maxTime = elapsedTime;
            }
            methods[2](maxTime,scr);
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
            updated = "0" + (parseInt(timeStr.substring(0,1)) + 1).toString() + ":" + "00";
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
            updated = (parseInt(timeStr.substring(0,2)) + 1).toString() + ":" + "00";
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
  function pushPromise(promises, boxes, methodsBox, point, plusTime, start, maxElapsedTime, screen) {
    promises.push(printerWithTimeout(boxes, point, plusTime, start, maxElapsedTime, screen)
      .then((newMaxTime) => {
        maxElapsedTime = newMaxTime;
      }));
  }
  
//Main function organizing the array and controlling the display of the array while changing

//objectsNeed, checker, boxPainter, watch)


function sortArray(objectsNeed, methodsBox){
    let start = performance.now(), plusTime = 0, maxElapsedTime = 0, promises = [];
    while(methodsBox[0](objectsNeed[objectsNeed.length-1]) === false){
        let array = objectsNeed[objectsNeed.length-1]
        let pointer = 0;
        for(let num = 0; num < array.length; num++){
            for (let point = pointer; array[point] > array[point + 1]; point++){
                switchIndex(point, array)
                printerWithTimeout(objectsNeed[0], methodsBox, point, plusTime, start, maxElapsedTime, objectsNeed[1])
                plusTime++;
                pushPromise(promises, objectsNeed[0], methodsBox[1], point, plusTime, start, maxElapsedTime, objectsNeed[1])
            }
            pointer++
        } 
    }
}







