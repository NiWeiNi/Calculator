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
  if (y === 0) {
    return "Error"
  }
  return (x / y);
}

// Equal function
function equal(textToNumber, operationFunction, display) {
  // Assign result of the operation to numberResult
  numberResult = operationFunction(numberFirst, numberLast);
  // Display the result
  display(numberResult);
  // Assign result to numberFirst
  numberFirst = numberResult;
}

// Display clicked number in display
function display(quote) {
  // Check if input is a string
  if (typeof quote === "string" && quote !== "Error") {
    // Check if string fits on screen, if not use exponential notation
    // if (quote.length > 9) {
    //   quote = quote[0] + "." + quote.slice(1, 5) + "E" + quote.length;
    // } else {
      
    // }
    quoteNumber = parseFloat(quote);
    if (quote.toString().length > 9) {
      return displayScreen.innerText = quoteNumber.toExponential();
    }
    
    else {
      return displayScreen.innerText = quoteNumber;
  }
  } 
  else if (quote === "string" && quote === "Error") {
    return displayScreen.innerText = quote
  }
  else {
    if (quote.toString().length > 9) {
      return displayScreen.innerText = quote.toExponential();
    }
    
    else {
      return displayScreen.innerText = quote;
  }
}
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
      operation = "+";
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
      // Convert last "number" typed to number type and store it in numberLast
      numberLast = textToNumber(numberText);
      switch (operation) {
        // Addition operation clicked before
        case "+":
          equal(textToNumber, addition, display);
          break;
        // Subtraction operation clicked before
        case "-":
          equal(textToNumber, subtraction, display);
          break;
        // Multiplication operation clicked before
        case "*":
          equal(textToNumber, multiplication, display);
          break;
        // Division operation clicked before
        case "/":
          equal(textToNumber, division, display);
          break;
    }}
  }
});