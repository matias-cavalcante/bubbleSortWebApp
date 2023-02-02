
let inputNumbers = document.getElementById("userInput");
const checkButton = document.getElementById("checkNumbers")
const boxNumbers = document.getElementById("number-container")

let boxesReference = []


inputNumbers.addEventListener("keyup", function(){
    let lastInput = inputNumbers.value.split('')[inputNumbers.value.length-1]
    let littleBox = document.createElement("div");
    littleBox.classList.add("number-boxes");
    littleBox.innerText = lastInput;
    boxNumbers.appendChild(littleBox);
    boxesReference.push(littleBox);
    //boxNumbers.children[4].innerText = "BOBO";
    //console.log("Lets see ", boxNumbers.children[4])
});


let userArray = null;

checkButton.addEventListener("click", function(){
    userArray = inputNumbers.value.split('').map(Number);
    let result = sortArray(userArray, arraySortedYesNo, boxNumbers, reviewInside);
})

function reviewInside(objectBox, w){
    //console.log ("-just test ", typeof objectBox.children[w].innerText)
    //objectBox.children[w].innerText = "BEBS"
    let bridge = objectBox.children[w].innerText;
    objectBox.children[w].innerText = objectBox.children[w+1].innerText
    objectBox.children[w+1].innerText = bridge

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

function sortArray(array, checker, boxes, printer){
    while(checker(array) === false){
        let pointer = 0;
        for(let num = 0; num < array.length; num++){
            for (let point = pointer; array[point] > array[point + 1]; point++){
                let bridgeValue = array[point]
                array[point] = array[point + 1]
                array[point + 1] = bridgeValue
                printer(boxes, point)
            }
            pointer++
        }
    }
    return array
}

//Graphic part functions





