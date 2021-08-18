//Intentional Global Variables
operatorBlock = false;
firstValue = null;
operatorString = '';
let lastResult = null;

//DOM MANIPULATION
const restrainedCharacters = ['0', '*', '/', '-', '+']

const mainContainer = document.querySelector('#main-container');

const calcDisplay = mainContainer.querySelector('#main-display')

const subCalcDisplay = mainContainer.querySelector('#sub-display')

const clearButton = mainContainer.querySelector('#clear-button')

const backspaceButton = mainContainer.querySelector('#backspace-button')

const decimalButton = mainContainer.querySelector('#decimal-button')

const calcButtons = Array.from(mainContainer.querySelectorAll('.calc-button'))

const operatorButtons = Array.from(mainContainer.querySelectorAll('.operator-button'))

const returnButton = mainContainer.querySelector('#return-button')

calcButtons.forEach(button => button.addEventListener('click', addSelf.bind(null, button.innerHTML)))

decimalButton.addEventListener('click', addDecimal)

clearButton.addEventListener('click', clearAll.bind(null, '0'))

backspaceButton.addEventListener('click', removeLast);

operatorButtons.forEach(button => button.addEventListener('click', operandPressed.bind(null, button.innerHTML)))

returnButton.addEventListener('click', returnPressed)

document.addEventListener('keydown', (event => {
    console.log(event.key);
    switch(event.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            addSelf(event.key);
            console.log('Number Pressed')
            break;
        case '*':
        case '-':
        case '/':
        case '+':
            console.log('Operator Pressed')
            operandPressed(event.key);
            break;
        case 'Enter':
        case '=':
            console.log('Return Pressed')
            returnPressed();
            break;
        case 'Backspace':
            if (event.shiftKey) {
                clearAll('0')
            }
            else {removeLast()}
            break;
        case '.':
            addDecimal();
            break;

}
}));

//INTERFACE BEHAVIOR
function returnPressed() {
    if (operatorString === '') {return null}
    if (firstValue === null) {firstValue = lastResult}
    calculateResult();
    subCalcDisplay.innerHTML += ' ' + secondValue;
    clear(result);
    resetAll();
}

function operandPressed(string) {
    if (operatorBlock) {
        return null; 
    } else if (operatorString !== '') {
        if (firstValue === null) {firstValue = lastResult}
        calculateResult();
        subCalcDisplay.innerHTML = result;
        clear('')
        lastResult = result
        resetAll();
        operatorSymbol = string;
        operatorString = convertToOperatorString(operatorSymbol);
        subCalcDisplay.innerText += ' ' + operatorSymbol
        operatorBlock = true
    } else {
    firstValue = Number(calcDisplay.innerHTML);
    subCalcDisplay.innerHTML = firstValue;
    clear('');
    operatorSymbol = string;
    operatorString = convertToOperatorString(operatorSymbol);
    subCalcDisplay.innerHTML += ' ' + operatorSymbol;
    operatorBlock = true;
}
}

function calculateResult() {
    secondValue = Number(calcDisplay.innerHTML);
    result = operate(firstValue, secondValue, operatorString)
    operatorBlock = false;
}

function resetAll() {
    firstValue = null;
    secondValue = null;
    operatorString = ''
}

function addSelf(string) {
    let isRestrained = (restrainedCharacters.some(char => calcDisplay.innerText.includes(char) && calcDisplay.innerText.length === 1))
    if (isRestrained) {calcDisplay.innerText = ''}
    calcDisplay.innerText += string
    operatorBlock = false
}

function addDecimal() {
    if (calcDisplay.innerText.includes('.')) {return null}
    calcDisplay.innerText += '.'
}

function removeLast() {
    let isRestrained = (restrainedCharacters.some(char => calcDisplay.innerText.includes(char) && calcDisplay.innerText.length === 1))
    if (calcDisplay.innerText.length === 1 && isRestrained) {
        calcDisplay.innerText = '0';
        subCalcDisplay.innerText = '';
        operatorBlcck = false
    } else if (calcDisplay.innerText.length === 1) {
        calcDisplay.innerText = '0';
    } 
    else {
        calcDisplay.innerText = calcDisplay.innerText.slice(0, -1);
    }
}
function clearAll(holder) {
    clear(holder);
    clearSub();
    resetAll();
}
function clear(holder) {
    calcDisplay.innerText = holder;
    operatorBlock = false;
}

function clearSub() {
    subCalcDisplay.innerText = '';
}

function convertToOperatorString(operatorSymbol) {
    switch (operatorSymbol) {
        case '/': 
            return 'divide';
        case '*': 
            return 'multiply';
        case '+':
            return 'add';
        case '-':
            return 'subtract'
        default: 
            return 'Invalid input'
    }
}

//CALCULATOR FUNCTIONS
function add(a, b) {
    return a + b;
}
//Subtract
function subtract(a, b) {
    return a - b;
}
//Multiply
function multiply(a, b) {
    return a * b
}
//Divide
function divide(a, b) {
    return a / b
}
//Operate (takes two numbers and a calculator function)
function operate(a, b, action) {
    switch (action) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
        default:
            return 'Invalid'
    }
}