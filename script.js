//main buttons
const numberBtn = document.querySelectorAll("[data-number]");
const operatorBtn = document.querySelectorAll("[data-operator]")
const equalBtn = document.getElementById("equal")
const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const dotBtn = document.getElementById("dot")

let operatorSelected = false;
let prevNumber = 0;
let currentNumber = "";
let operatorCount = 0; // to apply logic based on no. of times operator has been selected
let dotCount = 0; // prevent user from typing consecutive decimal places
let equalCount = 0;

// main interfaces
let bigDisplay = document.getElementById("big-display")
let smallDisplay = document.getElementById("small-display")
let keyPress;
let operator;

// let keyPress;

// math operations
function add(a,b){
    return parseFloat(a) + parseFloat(b);
}

function subtract(a,b){
    return a-b
}

function multiply(a,b){
    return a*b
}

function divide(a,b){
    return a/b
}

function operate(operator,a,b){
    let result = null;
    switch(operator)
    {
        case "+":
            result = add(a,b)
            break;
        case "-":
            result = subtract(a,b)
            break;
        case "×":
            result = multiply(a,b)
            break;
        case "÷":
            result = divide(a,b)
            break;
        default:
            result = "no operator chosen";
            break;
    }
    return result;
}

// event listeners

//   add event listener for number buttons
numberBtn.forEach(
    button => button.addEventListener("click", (button) => {
        keyPress = button.target.textContent;
        updateBigDisplay(keyPress)
        // console.log(keyPress)
        // console.log("prev number: " + prevNumber)
        // console.log("curr number: " + currentNumber)
        equalCount = 0;
    })
)

//   add event listener for operator button
operatorBtn.forEach(
    button => button.addEventListener("click", (button)=>{
        keyPress = button.target.textContent;
        operandUpdate(keyPress)
    })
    )
    
    //add event listener for equal button
    equalBtn.addEventListener("click", () => {
        evaluateOutput();
    })
    
    // add event listener for dot button
    dotBtn.addEventListener("click",(button) =>{
        keyPress = button.target.textContent;
        dotCount+=1;
        if(!multiDecimal()){
            updateBigDisplay(keyPress)
        }
    })
    

    // add event listener for keydown
    window.addEventListener("keydown", (event)=>{
            key = event.key;
            // console.log(event)
            console.log(key)
            if (key/1 == key){
                updateBigDisplay(key)
                equalCount = 0;
            }
            if (key == "Backspace"){
                deleteNum();
            }
            if (key == "Escape"){
                clearScreen();
            }
            if (key == "Enter"){
                evaluateOutput();
                "enter selected"
            }
            if (key == "/"){
                operandUpdate("÷")
            }
            if (key == "+" || key == "-"){
                operandUpdate(key)
            }
            if (key == "/"){
                operandUpdate("÷")
            }
            if(event.shiftKey && key == "*"){
                operandUpdate("×")
            }
        })
    
    

function operandUpdate(keyPress){
    // console.log(keyPress)
    operatorSelected = true;
    operatorCount+=1;
    if(operatorCount <= 1){
        prevNumber = currentNumber;
        // currentNumber = ""
    }
    if(operatorCount >= 2){
        evaluateOutput()
    }
    operator = keyPress
    updateSmallDisplay(prevNumber,operator)
    dotCount = 0;
    console.log("prev number: " + prevNumber)
    console.log("curr number: " + currentNumber)
    console.log("oper count: " + operatorCount)
}


//update small display
function updateSmallDisplay(prevNumber,operator){
    smallDisplay.textContent = prevNumber + " " + operator;
}

//update big display
function updateBigDisplay(keyPress){
    if (operatorSelected){
        currentNumber = "";
        operatorSelected = false;
        // console.log("operator exist!")
    }
    currentNumber += keyPress
    bigDisplay.textContent = currentNumber;
}

function clearBigDisplay(){
    bigDisplay.textContent = "";
}

// delete last value event listener
deleteBtn.addEventListener("click",deleteNum)
function deleteNum(){
    currentNumber = bigDisplay.textContent.slice(0,-1);
    bigDisplay.textContent = currentNumber
    console.log(currentNumber)
    if (currentNumber.length == 0){ 
        currentNumber = ""
    }
}

//  clear screen event listener
clearBtn.addEventListener("click", clearScreen)
function clearScreen(){
    prevNumber = 0;
    currentNumber = "";
    bigDisplay.textContent = "0";
    smallDisplay.textContent = "";
    operatorCount=0;
    equalCount = 0;
}

function evaluateOutput(){
    if(equalCount == 0){
        output = operate(operator, prevNumber, currentNumber)
        let fixedOutput;
        if (output % 1 != 0){
            fixedOutput = output.toFixed(2)
        }
        else{
            fixedOutput = output;
        }
        bigDisplay.textContent = fixedOutput
        currentNumber = fixedOutput;
        prevNumber = fixedOutput;
        updateSmallDisplay(prevNumber,operator)
        equalCount += 1;
    }
}


// prevent >1 decimal places
function multiDecimal(){
    if (dotCount>1){
        return true;
    }
    return false;
}