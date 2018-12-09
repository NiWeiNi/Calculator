// Assign frequently used DOM elements to variables
const buttons = document.querySelectorAll("button");
const displayScreen = document.querySelector(".result");
const calculator = document.querySelector(".calculator");

// 
let numberText = "";
let operation = "";
let numberX = 0;
let numberY = 0;

// Define arithmetic functions
// Add function
function addition(x, y) {
  return x + y;
}

// Minus function
function subtraction(x, y) {
  return x - y;
}

// Multiplication function
function multiplication(x, y) {
  return x * y;
}

// Division function
function division(x, y) {
  rerturn (x / y);
}

// Display clicked number in display
function display(quote) {
  return displayScreen.innerText = quote;
}

// Define clear memory and display function
function clear() {
  numberText = "";
  display("0");
  numberX = 0;
  numberY = 0;
}

// Define function that converts text to number
function textToNumber(text) {
  return parseFloat(text);
}

// Add event listener
calculator.addEventListener("click", () => {
  // Check if element clicked is a button
  if (event.target.type === "submit") {
    let number = parseFloat(event.target.innerText);
    // console.log(event.target.innerText === "CLEAR");
    // CHeck for content of the button, number, operation, equal or clear
    if (event.target.innerText === ".") {
      numberText = numberText + ".";
      display(numberText);
      console.log(numberText);
    } else if (!isNaN(number)) {
      //ToDo
      numberText = numberText + event.target.innerText;
      console.log(numberText);
      display(numberText);
    } else if (event.target.innerText == "CLEAR") {
      clear();
    } else if (event.target.innerText === "+") {
      operation = "+";
      if (numberX !== 0) {
        numberX = numberX + textToNumber(numberText);
        display(numberX);
        console.log(numberX);
        numberText = "";
      } else {
        numberX = textToNumber(numberText);
        numberText = "";
      }
    } else if (event.target.innerText === "-") {
      operation = "-";
    } else if (event.target.innerText === "*") {
      operation = "*";
    } else if (event.target.innerText === "/") {
      operation = "/"
    } else if (event.target.innerText === "=") {
      numberY = textToNumber(numberText);
      switch (operation) {
        case "+":
          numberX = addition(numberX, numberY);
          display(numberX);
          break;
        case "-":
          display(subtraction(numberX, numberY));
          break;
    }}
  }
});