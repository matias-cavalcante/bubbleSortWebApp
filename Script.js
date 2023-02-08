import { paintBoxes} from './graphicFunctions.js';
import { timedPainter } from './graphicFunctions.js';
import {updateClock} from './clockUpdater.js'
import {arraySortedYesNo, switchIndex} from './checkAndSwitchArrayMethods.js'
import {handleInput} from './handleUserInput.js'


let inputNumbers = document.getElementById("userInput");
const sortButton = document.getElementById("checkNumbers");
const numbContainer = document.getElementById("number-container");
const timerClock = document.getElementById("timer");
const reloadPage = document.getElementById("loadAgain")
const inputErrorMessage = document.getElementById("error")

let userArray = null;
let sortArrayObjects = [numbContainer, timerClock, reloadPage]
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

reloadPage.addEventListener("click", function() {
    setTimeout(function(){
        location.reload();
    }, 500);
});

inputNumbers.addEventListener("keyup", inputErrorMessage,  handleInput);
 
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




  







