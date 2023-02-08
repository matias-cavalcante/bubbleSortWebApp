function removeLastBox(numBox) {
    let boxes = document.querySelectorAll(".number-boxes");
    if (boxes.length) {
      numBox.removeChild(boxes[boxes.length-1]);
    }
  }
  
  function preventDefaultAndShowError(message) {
    event.preventDefault();
    message.style.display = "block";
  }
  
  function hideErrorAndAddBox(key, message, numBox) {
    message.style.display = "none";
    let lastInput = key;
    console.log("We are testing in here ", key.innerText)
    let littleBox = document.createElement("div");
    littleBox.classList.add("number-boxes");
    littleBox.innerText = lastInput;
    numBox.appendChild(littleBox);
  }

  export function handleInput(event, message, box) {
    if (event.key === 'Backspace') {
      removeLastBox(box);
    } else if (isNaN(parseInt(event.key))) {
      preventDefaultAndShowError(message);
    } else {
      hideErrorAndAddBox(event.key, message, box);
    }
  }