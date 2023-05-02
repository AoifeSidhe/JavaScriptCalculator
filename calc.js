/* Calculator on basic js  23/4/2023*/

/* Main Calculator */

let displayElement = document.getElementById("display");
let numberButtons = document.querySelectorAll(".number");

// Add click event listener to number buttons
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    displayElement.innerHTML += button.innerHTML;
  });
});

// Add click event listener to AC button
let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
  displayElement.innerHTML = "";
});

// Add click event listener to operator buttons
let operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    displayElement.innerHTML += button.innerHTML;
  });
});

/* equals button */

// Add click event listener to equals button
let equalsButton = document.getElementById("equals");
equalsButton.addEventListener("click", () => {
  // Get the contents of the display element and evaluate it as a mathematical expression
  let displayContent = displayElement.innerHTML;
  let result = eval(displayContent);

  // Round the result to 5 decimal places and remove any trailing zeros
  if (typeof result === "number" && isFinite(result) && !Number.isInteger(result)) {
    result = result.toFixed(5).replace(/\.?0+$/, '');
  }

  // Set the display element to the result
  displayElement.innerHTML = result;
});


/* delete button */

// Add click event listener to delete button
let deleteButton = document.getElementById("eraser");
deleteButton.addEventListener("click", () => {
  // Get the current contents of the display element
  let displayContent = displayElement.innerHTML;
  
  // Remove the last character from the display content using the slice method
  displayContent = displayContent.slice(0, -1);
  
  // Set the display element to the new display content
  displayElement.innerHTML = displayContent;
});

/* my tool for finding last number 
 display2 is hidden in calc.html*/

const display2El = document.getElementById('display2');

// Create a new MutationObserver instance
const observer = new MutationObserver(() => {
  const text = display.innerText;
  const matches = text.match(/\d+/g);
  if (matches && matches.length > 0) {
    const lastNumber = matches[matches.length - 1];
    display2El.innerText = `Last number: ${lastNumber}`;
  } else {
    display2El.innerText = '';
  }
});

// Configure the observer to watch for changes in the content of the display element
observer.observe(display, { childList: true, subtree: true });

/* == plus minus == */

// Add click event listener to plus minus button
let plusminusButton = document.getElementById("plus-minus");
plusminusButton.addEventListener("click", () => {
  const display1El = document.getElementById("display");
  const display2El = document.getElementById("display2");
  let text = display1El.innerText;

  /* experimental code */
  if (!text) {
    display1El.innerText = '-';
    document.querySelectorAll('.operator').forEach(button => {
      button.disabled = true;
    });
    return;
  }

  const matches = text.match(/-?\d+(\.\d*)?([eE][+-]?\d+)?/g); // Regular expression to match numbers (including negative numbers)
  if (matches && matches.length > 0) {
    let lastNumber = matches[matches.length - 1];
    if (lastNumber.startsWith('-') && (matches.length === 1 || /\+|\-|\*|\//.test(text.charAt(text.lastIndexOf(lastNumber) - 1)))) { 
      // If the number is negative and appears at the beginning or after another operator, remove the '-' sign
      lastNumber = lastNumber.substring(1);
    } else { // If the number is positive, add a '-' sign
      lastNumber = '-' + lastNumber;
    }
    text = text.substring(0, text.lastIndexOf(matches[matches.length - 1])) + lastNumber; // Replace the last number with its negative value
    display1El.innerText = text;
    const newMatches = text.match(/-?\d+(\.\d*)?([eE][+-]?\d+)?/g);
    if (newMatches && newMatches.length > 0) {
      const newLastNumber = parseFloat(newMatches[newMatches.length - 1]);

    /*   code for my debuging */
      display2El.innerText = `Last number: ${newLastNumber}`;
    } else {
      display2El.innerText = '';
    }
  }
});

/* Some logic for buttons */

document.addEventListener("DOMContentLoaded", () => {
/*   const display = document.getElementById("display");  unused declaration*/ 
  const operatorButtons = document.querySelectorAll(".operator");

  // Disable operator buttons and also enable dot when an operator button is clicked
  operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      operatorButtons.forEach((button) => {
        button.disabled = true;
       /*  dotButton.disabled = false; */
      });
    });
  });
});

// Enable operator buttons when a number button is pressed
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    operatorButtons.forEach((button) => {
      button.disabled = false;
    });
  });
});

/* === dot ===  */

const dotButton = document.getElementById("dot");
const displayDiv = document.getElementById("display");

/* if (displayDiv.textContent.trim() === "") {
  dotButton.style.backgroundColor = "red";
} 
debuging part - makes background red. was used to determine if evrything is fine with empty display condition*/

dotButton.addEventListener("click", () => {
  let displayContent = displayElement.innerHTML;
    dotButton.disabled = true;
/*     disabling button on clcik */

  // Check if the last character is an operator(+,-,/,*)
  let lastCharacter = displayContent.slice(-1);
  let isOperator = lastCharacter == "+" || lastCharacter == "-" || lastCharacter == "*" || lastCharacter == "/";

  if (displayDiv.textContent.trim() === "") {
    // If display is empty, add zero and then the dot
    displayElement.innerHTML = "0" + ".";
  
  } else if (isOperator) {
    // If the last character is an operator, add a zero before the dot
    displayElement.innerHTML += "0" + dotButton.innerHTML;
  } else {
    // Otherwise, just add the dot
    displayElement.innerHTML += dotButton.innerHTML;
  }
});

function insertp() 
/* function for button tests */
{
  alert("Button clicked! +1");
}


/* === % Calculator === */

/* === insert button === */

function insertvalue() {
  // Get the text content of the display div
  var displayText = document.getElementById("display").textContent;

  // Extract the last number from the display text using a regular expression
  var lastNumber = parseFloat(displayText.match(/\d+(\.\d+)?$/)[0]);

  // Insert the last number into the number input field
  document.getElementById("number-input").value = lastNumber;
}


/* === 1st row calculations ===  */

function calculatep() {
  // Get the number input value
  var numberInput = parseFloat(document.getElementById("number-input").value);
  // Get the percent input value
  var percentInput = parseFloat(document.getElementById("percent-input").value);
  // Calculate the percentage of the number
  var result = (numberInput * percentInput) / 100;
  // Display the result in the result div
  document.getElementById("perresult").textContent = result;
}


/* === RESET === */

function resetpercalc() {
/*   alert("Hello! I am an alert box!") */ 
/* alert for debuging */

document.getElementById("number-input").value = '';
document.getElementById("number-input2").value = '';
document.getElementById("number-input3").value = '';
document.getElementById("percent-input").value = '';
document.getElementById("perresult").textContent = 'Awaiting instructions';
document.getElementById("perresult2").textContent = 'Awaiting instructions';
};


/* === 2ndrow buttons of % calculator === */

/* insert X */

function insertvalueX() {
  // Get the text content of the display div
  var displayText = document.getElementById("display").textContent;
  // Extract the last number from the display text using a regular expression
  var lastNumber = parseFloat(displayText.match(/\d+(\.\d+)?$/)[0]);
  // Insert the last number into the number input field
  document.getElementById("number-input2").value = lastNumber;
}

// insert Y

function insertvalueY() {
  // Get the text content of the display div
  var displayText = document.getElementById("display").textContent;

  // Extract the last number from the display text using a regular expression
  var lastNumber = parseFloat(displayText.match(/\d+(\.\d+)?$/)[0]);

  // Insert the last number into the number input field
  document.getElementById("number-input3").value = lastNumber;
}

// Calculate Relative Percentage 

function calculatep2() {
  let numberX = parseFloat(document.getElementById("number-input2").value);
  let numberY = parseFloat(document.getElementById("number-input3").value);

  // X Y = X is a% from Y
  // a = (X / Y) * 100;

  let resultXY = (numberX/numberY) * 100;
  document.getElementById("perresult2").textContent = `${numberX} is ${resultXY}% from ${numberY}`
}

// === % Calculate Button Logic === 

// === 2nd calculate button  ===

const percal2 = document.getElementById("percal2");
const perinsb2 = document.getElementById("number-input2");
const perinsb3 = document.getElementById("number-input3");

// disable the button if either input2 or input3 is empty
if (perinsb2.value === "" || perinsb3.value === "") {
  percal2.disabled = true;
} else {
  percal2.disabled = false;
}

// add event listeners to the input elements to detect changes
perinsb2.addEventListener("input", handleInputChange);
perinsb3.addEventListener("input", handleInputChange);

// add event listeners to the buttons to detect clicks
document.getElementById("perinsb2").addEventListener("click", handleButtonClick);
document.getElementById("perinsb3").addEventListener("click", handleButtonClick);
document.getElementById("resetpercalcb").addEventListener("click", handleButtonClick); 
document.getElementById("resetpercalcb").addEventListener("click", handleButtonClick2);/* also for reset */

// function to handle changes to the input elements input2 or input3
function handleInputChange() {
  // disable the button if either input is empty
  if (perinsb2.value === "" || perinsb3.value === "") {
    percal2.disabled = true;
  } else {
    percal2.disabled = false;
  }
}

// function to handle clicks on the buttons
function handleButtonClick() {
  // check if both inputs have values and enable/disable the button accordingly
  if (perinsb2.value === "" || perinsb3.value === "") {
    percal2.disabled = true;
    } else {
    percal2.disabled = false;
  }
}

// === 1st calculate button  ===

const percal = document.getElementById("percal");
const number22 = document.getElementById("number-input");
const per22 = document.getElementById("percent-input");

// disable the button if either percent-input or numner-input is empty
if (number22.value === "" || per22.value === "") {
  percal.disabled = true;
} else {
  percal.disabled = false;
}


// add event listeners to the input elements to detect changes
number22.addEventListener("input", handleInputChange2);
per22.addEventListener("input", handleInputChange2);

// add event listeners to the buttons to detect clicks
document.getElementById("perinsb").addEventListener("click", handleButtonClick2);
/* document.getElementById("resetpercalcb").addEventListener("click", handleButtonClick2); */

// function to handle changes to the input elements
function handleInputChange2() {
  // disable the button if either input is empty
  if (number22.value === "" || per22.value === "") {
    percal.disabled = true;
  } else {
    percal.disabled = false;
  }
}


// function to handle clicks on the buttons
function handleButtonClick2() {
  // check if both inputs have values and enable/disable the button accordingly
  if (number22.value === "" || per22.value === "") {
    percal.disabled = true;
  } else {
    percal.disabled = false;
  }
}

/* wrong buttons for handleButtonClick2! look!
{
  if (perinsb2.value === "" || perinsb3.value === "") {
    percal.disabled = true;
  } else {
    percal.disabled = false;
  }
} */

/* Insert Buttons */

const displayDiv2 = document.getElementById("display");
const perinsb = document.getElementById("perinsb");
const perinsb22 = document.getElementById("perinsb2");
const perinsb33 = document.getElementById("perinsb3");

// Disable buttons if there are no numbers in the display div
if (!displayDiv2.textContent.match(/\d+/)) {
  perinsb.disabled = true;
  perinsb22.disabled = true;
  perinsb33.disabled = true;
}

// Listen for changes in the display div content and enable/disable the buttons accordingly
const observer2 = new MutationObserver((mutations) => {
  if (!displayDiv2.textContent.match(/\d+/)) {
    perinsb.disabled = true;
    perinsb22.disabled = true;
    perinsb33.disabled = true;
  } else {
    perinsb.disabled = false;
    perinsb22.disabled = false;
    perinsb33.disabled = false;
  }
});

observer2.observe(displayDiv2, { childList: true, characterData: true, subtree: true });


/* === randomiser! === */

/* some generate button logic */
// Select the button element with the ID "generate-button3r"
const generateButtonon = document.getElementById("generate-buttonon");

// Select the input elements with the IDs "min-input3r" and "max-input3r", and retrieve their values as strings
const minInput3r = document.getElementById("min-input3r");
const maxInput3r = document.getElementById("max-input3r");

// Define a function to enable/disable the Generate button based on the input values
function handleInputChange3() {
  if (minInput3r.value && maxInput3r.value) { // if both inputs have values
    generateButtonon.disabled = false; // enable the generate button
  } else {
    generateButtonon.disabled = true; // disable the generate button
  }
}

// Add event listeners to the input elements that listen for a "change" event and execute the handleInputChange3() 
// function when triggered
minInput3r.addEventListener("change", handleInputChange3);
maxInput3r.addEventListener("change", handleInputChange3);

// Add event listeners to the input elements that listen for a "input" event and execute the handleInputChange3() 
// function when triggered
minInput3r.addEventListener("input", handleInputChange3);
maxInput3r.addEventListener("input", handleInputChange3);

/* INSERT RANDOMISER*/

function insertvalueRMiMax() {
  const minInput = document.getElementById("min-input3r");
  const maxInput = document.getElementById("max-input3r");

  // Check if both inputs are empty or if either of them is 0
  if ((minInput.value.trim() === "" || parseInt(minInput.value) === 0) && (maxInput.value.trim() === "" || parseInt(maxInput.value) === 0)) {
    // If both inputs are empty or either of them is 0, generate random numbers in both
    let min = 0, max = 0;
    while (min === 0 && max === 0) {
      min = Math.floor(Math.random() * 201);
      max = Math.floor(Math.random() * 201);
    }

    // Ensure that min is less than max
    if (min > max) {
      [min, max] = [max, min];
    }

    minInput.value = min;
    maxInput.value = max;

    // Enable the "Generate" button by calling the handleInputChange3() function
    handleInputChange3();

  } else if (minInput.value.trim() === "" && maxInput.value.trim() === "") {
    // If both inputs are empty, generate random numbers in both
    let min = 0, max = 0;
    while (min === 0 && max === 0) {
      min = Math.floor(Math.random() * 201);
      max = Math.floor(Math.random() * 201);
    }

    // Ensure that min is less than max
    if (min > max) {
      [min, max] = [max, min];
    }

    minInput.value = min;
    maxInput.value = max;

    // Enable the "Generate" button by calling the handleInputChange3() function
    handleInputChange3();

  } else {
    // If either or both inputs have values, display a confirmation message
    const message = `${minInput.value.trim() !== "" ? "Min input" : ""}${minInput.value.trim() !== "" && maxInput.value.trim() !== "" ? " and " : ""}${maxInput.value.trim() !== "" ? "Max input" : ""} is not empty. Generate random numbers in both?`;

    const confirmation = confirm(message);
    if (confirmation) {
      // If the user confirms, generate random numbers in both inputs
      let min = 0, max = 0;
      if (parseInt(maxInput.value) - parseInt(minInput.value) < 2) {
        // If the difference between min and max is less than 2, generate new values
        while (min === 0 && max === 0) {
          min = Math.floor(Math.random() * 201);
          max = Math.floor(Math.random() * 201);
        }
      } else {
        // Otherwise, generate random numbers
        while (min === 0 && max === 0) {
          min = Math.floor(Math.random() * parseInt(maxInput.value));
          max = Math.floor(Math.random() * (parseInt(maxInput.value) - parseInt(minInput.value)) + parseInt(minInput.value));
        }
      }

      // Ensure that min is less than max
      if (min > max) {
        [min, max] = [max, min];
      }

      minInput.value = min;
      maxInput.value = max;

      // Enable the "Generate" button by calling the handleInputChange3() function
      handleInputChange3();
    }
  }
}

/* GENERATE button */

function generateRandomNumber4r4() {
  const minInput = document.getElementById("min-input3r");
  const maxInput = document.getElementById("max-input3r");
  const resultParagraph = document.getElementById("resultrand");

  const min = parseInt(minInput.value);
  const max = parseInt(maxInput.value);

  if (isNaN(min) || isNaN(max)) {
    resultParagraph.textContent = "Please enter valid numbers in both fields.";
  } else if (min > max) {
    resultParagraph.textContent = "The minimum value cannot be greater than the maximum value.";
    resultParagraph.style.fontSize = "20px";
    resultParagraph.style.paddingLeft = "20px";
    resultParagraph.style.paddingRight = "8px";
  } else {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
/*     resultParagraph.textContent = `Random number between ${min} and ${max}: ${randomNumber}`; */
resultParagraph.textContent = randomNumber;
resultParagraph.style.fontSize = "62px";
  }
}

const generateButton = document.getElementById("generate-buttonon");
generateButton.addEventListener("click", generateRandomNumber4r4);




/* Advanced logic for main calculator */

/* Infinity logic */
// get a reference to the equal button, calcbuttons div, clear button and display element
const equalButton2 = document.querySelector("#equals");
const displayElement2 = document.querySelector("#display");
const calcButtons = document.querySelector("#calcbuttons");
const clearButton2 = document.querySelector("#clear");

// add a click event listener to the equal button
equalButton2.addEventListener("click", () => {
  // check if the display element's innerHTML contains "Infinity" or "NaN"
  if (displayElement2.innerHTML.includes("Infinity") || displayElement2.innerHTML.includes("NaN")) {
    // disable all buttons in calcbuttons except for the clear button
    for (const button of calcButtons.querySelectorAll("button:not(#clear)")) {
      button.disabled = true;
    }
    // display an alert message
 /*    alert("ALARM!"); */
  }
});

// add a click event listener to the clear button
clearButton2.addEventListener("click", () => {
  // enable all buttons with class="number", id="divide", id="plus-minus", id="dot", and id="zero"
  for (const button of calcButtons.querySelectorAll(".number, #eraser,  #plus-minus, #dot, #zero", )) {
/*     I removed #equals cause it will be enabled latter */
/*     for (const button of calcButtons.querySelectorAll(".number, #eraser, #equals, #plus-minus, #dot, #zero", )) { */
    button.disabled = false;
  }
});


                /* === equalsButton logic - enabling and disabling === */

// Listen for changes to the display

const observer4 = new MutationObserver(() => {
  const displayContent3 = displayElement.innerHTML.trim();
  if (!displayContent3 || !isNaN(displayContent3)) {
    // If there is no content or if it's a number, disable the Equals button
    equalsButton.disabled = true;
  } else  {
  try {
    const result3 = eval(displayElement.innerHTML);
    if (!isNaN(result3)) {
      // If the result is a valid number, enable the Equals button
      equalsButton.disabled = false;
    } else {
      // If the result is not a valid number, disable the Equals button
      equalsButton.disabled = true;
    }
  } catch {
    // If there was an error evaluating the user input, disable the Equals button
    equalsButton.disabled = true;
  }
  if (displayContent3.includes('/0')) {
    // If there is a divide by zero operation, enable the Equals button
    equalsButton.disabled = false;
  }
}
});
observer4.observe(display, { childList: true, subtree: true });


/* Randomiser again */

/* Randomiser reset button */

const resetButton = document.getElementById('resetrand3r');
const maxInput = document.getElementById('max-input3r');
const minInput = document.getElementById('min-input3r');
const resetresultrand = document.getElementById('resultrand');

resetButton.addEventListener('click', () => {
  maxInput.value = "";
  minInput.value = "";
  resetresultrand.textContent = ''

  handleInputChange3();
});


/* span styling */
/* span can not be disabled as buttons can */
const plusMinusButton = document.getElementById('plus-minus');
const pmctSpan = document.getElementById('pmct');

// Update the color of the "pmct" span based on the "disabled" state of the "plus-minus" button
function updatePmctColor() {
  if (plusMinusButton.disabled) {
    pmctSpan.classList.add('disabled');
  } else {
    pmctSpan.classList.remove('disabled');
  }
}

// Use a MutationObserver to detect changes to the "disabled" property of the "plus-minus" button
const observer5 = new MutationObserver(updatePmctColor);
observer5.observe(plusMinusButton, { attributes: true });

// Call the "updatePmctColor" function on page load
document.addEventListener('DOMContentLoaded', updatePmctColor);

/* no dots in inputs */

/* min event listener */
minInput.addEventListener('keydown', (event) => {
  if (event.key === '.') {
    event.preventDefault();
    alert('Dots Are Not Allowed!');
  }
});

/* max event listener */
maxInput.addEventListener('keydown', (event) => {
  if (event.key === '.') {
    event.preventDefault();
    alert('Dots Are Not Allowed!');
  }
});

/* no 2nd dots in inputs */

function observeDivForDot() {
  // Find the div element to monitor for changes
  const divElement = document.getElementById("display");

  // Find the button to disable if the div element's content contains a dot
  const buttonElement = document.getElementById("dot");

  // Create a new MutationObserver object named observer6
  /* const observer6 = new MutationObserver(function(mutationsList, observer6) { */
    const observer6 = new MutationObserver(function(mutationsList) {
    
    // Loop through each mutation in the mutations list
    for(let mutation of mutationsList) {
      
      // Check if the mutation was a change to the div element's content
      if (mutation.type === 'childList' && mutation.target === divElement) {
        
        // Check if the div element's new content contains a dot
        if (divElement.textContent.includes(".")) {
          
          // Disable the button if there is a dot
          buttonElement.disabled = true;
          
        } else {
          
          // Enable the button if there is no dot
          buttonElement.disabled = false;
        }
      }
    }
  });

  // Start observing the div element for changes to its content using observer6
  observer6.observe(divElement, { childList: true });
}

// Call the observeDivForDot function on page load
window.addEventListener('load', observeDivForDot);
/* document.addEventListener('DOMContentLoaded', observeDivForDot); */

// Add an event listener for DivForDot to the button with the class 'operator'
const operatorButton = document.querySelector('.operator');
operatorButton.addEventListener('click', observeDivForDot);

/* for less scrolling */
// Configure the observer to watch for changes in the content of the display element
/* observer.observe(display, { childList: true, subtree: true }); */
/* let displayElement = document.getElementById("display"); */ 

/* The End! */