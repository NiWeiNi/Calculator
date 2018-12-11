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
  return (x / y);
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

// Define function to set up type of arithmetic operation
function setOperation(operatorText, convertToNumber, operatorFunction) {
  // String that defines type of arithmetic operation 
  operation = operatorText;
  // Convert current string of "numbers" into numbers
  numberLast = convertToNumber(numberText);
  // Get result with the proper function
  numberResult = operatorFunction(numberResult, numberLast);
  // Call display to show the result on screen
  display(numberResult);
  console.log(numberResult);
  // Store the result to reuse later for further operations
  numberFirst = numberResult;
  // Reset the input field to store new number
  numberText = "0";
}

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
      setOperation("+", textToNumber, addition);
    }
    // Subtraction operation
    else if (event.target.innerText === "-") {
      operation = "-";
      // Check if numberText has stored any previous number
      if (numberText === "" ) {
        numberText = "-";
      } 
      // If numberText is not empty store new number to numberAux
      else {
        numberAux = textToNumber(numberText);
        // If numberFirst is empty, store the new value in there
        if (numberFirst === 0) {
          numberFirst = numberAux;
        }
        // Store the new value has numberLast if numberFirst is in use
        else {
          numberLast = numberAux;
        }
        // Reset numberText for new numbers input
        numberText = ""; 
      }
    }
    else if (event.target.innerText === "*") {
      operation = "*";
      numberAux = textToNumber(numberText);
        // If numberFirst is empty, store the new value in there
        if (numberFirst === 0) {
          numberFirst = numberAux;
        }
        // Store the new value has numberLast if numberFirst is in use
        else {
          numberLast = numberAux;
        }
        // Reset numberText for new numbers input
      numberText = ""; 
      
    } else if (event.target.innerText === "/") {
      operation = "/";
      numberAux = textToNumber(numberText);
        // If numberFirst is empty, store the new value in there
        if (numberFirst === 0) {
          numberFirst = numberAux;
        }
        // Store the new value has numberLast if numberFirst is in use
        else {
          numberLast = numberAux;
        }
        // Reset numberText for new numbers input
      numberText = "";
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
          numberLast = textToNumber(numberText);
          numberResult = subtraction(numberFirst, numberLast);
          display(numberResult);
          numberFirst = numberResult;
          break;
        case "*":
          numberLast = textToNumber(numberText);
          numberResult = multiplication(numberFirst, numberLast);
          display(numberResult);
          numberFirst = numberResult;
          break;
        case "/":
          numberLast = textToNumber(numberText);
          numberResult = division(numberFirst, numberLast);
          display(numberResult);
          numberFirst = numberResult;
          break;
    }}
  }
});