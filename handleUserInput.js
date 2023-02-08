function removeLastBox() {
    let boxes = document.querySelectorAll(".number-boxes");
    if (boxes.length) {
      numbContainer.removeChild(boxes[boxes.length-1]);
    }
  }
  
  function preventDefaultAndShowError(message) {
    event.preventDefault();
    message.style.display = "block";
  }
  
  function hideErrorAndAddBox(key, message) {
    message.style.display = "none";
    let lastInput = key;
    let littleBox = document.createElement("div");
    littleBox.classList.add("number-boxes");
    littleBox.innerText = lastInput;
    numbContainer.appendChild(littleBox);
  }

  export function handleInput(event, message) {
    if (event.key === 'Backspace') {
      removeLastBox();
    } else if (isNaN(parseInt(event.key))) {
      preventDefaultAndShowError(message);
    } else {
      hideErrorAndAddBox(event.key, message);
    }
  }