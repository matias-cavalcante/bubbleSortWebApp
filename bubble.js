import { paintBoxes} from './graphicFunctions.js';
import { timedPainter } from './graphicFunctions.js';

console.log("This is working with expprt-import")


let inputNumbers = document.getElementById("userInput");
const sortButton = document.getElementById("checkNumbers");
const numbContainer = document.getElementById("number-container");
const timerClock = document.getElementById("timer");
const reloadPage = document.getElementById("loadAgain")
const inputErrorMessage = document.getElementById("error")

reloadPage.addEventListener("click", function() {
    setTimeout(function(){
        location.reload();
    }, 500);
});

  function handleInput(event) {
    if (event.key === 'Backspace') {
      removeLastBox();
    } else if (isNaN(parseInt(event.key))) {
      preventDefaultAndShowError();
    } else {
      hideErrorAndAddBox(event.key);
    }
  }
  
  function removeLastBox() {
    let boxes = document.querySelectorAll(".number-boxes");
    if (boxes.length) {
      numbContainer.removeChild(boxes[boxes.length-1]);
    }
  }
  
  function preventDefaultAndShowError() {
    event.preventDefault();
    inputErrorMessage.style.display = "block";
  }
  
  function hideErrorAndAddBox(key) {
    inputErrorMessage.style.display = "none";
    let lastInput = key;
    let littleBox = document.createElement("div");
    littleBox.classList.add("number-boxes");
    littleBox.innerText = lastInput;
    numbContainer.appendChild(littleBox);
  }
  
  inputNumbers.addEventListener("keyup", handleInput);
  
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


//Bubble sort algorithm functions

function arraySortedYesNo(uncertain){
    for (let before = 0; before < uncertain.length; before++){
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


//Populate clock container with seconds and milliseconds
function paintLessOneSecond(counter, clockBox){
    let intervalId = setInterval(function() {
        counter++;
        if (counter >= 100) {
            clearInterval(intervalId);
            return;
        }
        let updated = "00"  + ":" + counter.toString().padStart(2, "0");
        clockBox.innerText = updated;
    }, 10);
}

function paintSecondCase(counter, clockBox, timeStr){
    let intervalId = setInterval(function() {
        counter++;
        if (counter >= 101) {
            clearInterval(intervalId);
            let updated = "0" + (parseInt(timeStr.substring(0,1)) + 1).toString() + ":" + "00";
            clockBox.innerText = updated;
            return;
        }else{
            let updated = "0" + timeStr.substring(0,1) + ":" + counter.toString().padStart(2, "0");
            clockBox.innerText = updated;
        }  
    }, 10);
}

function paintThirdCase(counter, clockBox, timeStr){
    let intervalId = setInterval(function() {
        counter++;
        if (counter >= 101) {
            clearInterval(intervalId);
            let updated = (parseInt(timeStr.substring(0,2)) + 1).toString() + ":" + "00";
            clockBox.innerText = updated;
            return;
        }else{
            let updated = timeStr.substring(0,2) + ":" + counter.toString().padStart(2, "0");
            clockBox.innerText = updated;
        }
    }, 10);
}

function updateClock(time, clock) {
    let countTo99 = 0;
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

function sortArray(objectsNeed, methodsBox){
    let start = performance.now(), plusTime = 0, maxElapsedTime = 0;
    while(methodsBox[0](objectsNeed[objectsNeed.length-1]) === false){
        let array = objectsNeed[objectsNeed.length-1]
        let pointer = 0;
        for(let num = 0; num < array.length; num++){
            for (let point = pointer; array[point] > array[point + 1]; point++){
                switchIndex(point, array)
                timedPainter(objectsNeed[0], objectsNeed[1], methodsBox, point, plusTime, start, maxElapsedTime)
                plusTime++;
            }
            pointer++
        } 
    }
}




  







