
let inputNumbers = document.getElementById("userInput");
const checkButton = document.getElementById("checkNumbers")
const boxNumbers = document.getElementById("number-container")

let userArray = null;

checkButton.addEventListener("click", function(){
    userArray = inputNumbers.value.split('').map(Number);
    let result = sortArray(userArray, arraySortedYesNo);
    window.alert(result);
})

//Bubble sort algorithm functions

function arraySortedYesNo(uncertain){
    for (before = 0; before < uncertain.length; before++){
        if (uncertain[before] > uncertain[before+1]){
            return false
        }
    }
    return true
}

function sortArray(array, checker){
    while(checker(array) === false){
        let pointer = 0;
        for(let num = 0; num < array.length; num++){
            for (let point = pointer; array[point] > array[point + 1]; point++){
                let bridgeValue = array[point]
                array[point] = array[point + 1]
                array[point + 1] = bridgeValue
            }
            pointer++
        }
    }
    return array
}

//Graphic part functions


inputNumbers.addEventListener("keyup", function(){
    console.log(inputNumbers.value.split('')[inputNumbers.value.length-1])
    let littleBox = document.createElement("div");
    littleBox.innerText = inputNumbers.value.split('')[inputNumbers.value.length-1]
    littleBox.classList.add("number-boxes");
    boxNumbers.appendChild(littleBox);
    
});
