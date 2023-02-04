
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
});


let userArray = null;

checkButton.addEventListener("click", function(){
    userArray = inputNumbers.value.split('').map(Number);
    let result = sortArray(userArray, arraySortedYesNo, boxNumbers, reviewInside);
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

function sortArray(array, checker, boxes, printer){
    let plusTime = 0;
    while(checker(array) === false){
        let pointer = 0;
        for(let num = 0; num < array.length; num++){
            for (let point = pointer; array[point] > array[point + 1]; point++){
                let bridgeValue = array[point]
                array[point] = array[point + 1]
                array[point + 1] = bridgeValue
                setTimeout(()=>{
                    printer(boxes, point)
                }, 900 * plusTime)
                plusTime++;
            }
            pointer++
        }
    }
    return array
}


//Graphic part functions





