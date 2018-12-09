// Assign frequently used DOM elements to variables
const buttons = document.querySelectorAll("button");
const displayScreen = document.querySelector(".result");
const calculator = document.querySelector(".calculator");

// Higher scope variables
let numberText = "";
let operation = "";
let numberAux = 0;
let numberFirst = 0;
let numberLast = 0;
let numberResult = 0;

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
  numberAux = 0;
  numberFirst = 0;
  numberLast = 0;
  numberResult = 0;
}

// Define function that converts text to number
function textToNumber(text) {
  return parseFloat(text);
}

// Define auxiliar function to set up

// Add event listener
calculator.addEventListener("click", () => {
  // Check if element clicked is a button
  if (event.target.type === "submit") {
    // console.log(event.target.innerText === "CLEAR");
    // CHeck for content of the button, number, operation, equal or clear
    if (event.target.innerText === ".") {
      numberText = numberText + ".";
      display(numberText);
      console.log(numberText);
    }
    // Convert button content into number and check if it is a number
    else if (!isNaN(parseFloat(event.target.innerText))) {
      numberText = numberText + event.target.innerText;
      console.log(numberText);
      display(numberText);
    } else if (event.target.innerText == "CLEAR") {
      clear();
    }
    // Addition operation
    else if (event.target.innerText === "+") {
      // Set operation to +
      operation = "+";
          numberLast = textToNumber(numberText);
          if (numberLast !== 0) {
            numberAux = numberLast;
          }
          numberResult = numberResult + numberAux;
          display(numberResult);
          console.log(numberResult);
          numberFirst = numberResult;
          numberText = "0";
    } else if (event.target.innerText === "-") {
      operation = "-";
    } else if (event.target.innerText === "*") {
      operation = "*";
    } else if (event.target.innerText === "/") {
      operation = "/"
    }
    // = botton clicked
    else if (event.target.innerText === "=") {
      numberLast = textToNumber(numberText);
      // + operation clicked before
      switch (operation) {
        case "+":
          numberResult = addition(numberFirst, numberLast);
          display(numberResult);
          break;
        case "-":
          //ToDo
          break;
    }}
  }
});