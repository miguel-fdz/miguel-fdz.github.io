let operand;
let operand2;
let operator;
const display = document.getElementById("display");

/**
 * Set number & operator keys functionality when clicked
 */
const numberKeys = document.querySelectorAll('.number-key');
numberKeys.forEach(key => key.addEventListener('click', () => modDisplay(key.value)));
const operatorKeys = document.querySelectorAll('.operator-key');
operatorKeys.forEach(key => key.addEventListener('click', () => applyOperator(key.value)));

/**
 * Number key behaviour
 */
function modDisplay(key) {
  if (display.classList.contains('applied-operator')) {
    display.innerHTML = '0';
    display.classList.remove('applied-operator');
  }; 
  if (key == 0 && display.innerHTML === '0') return; 
  else if (display.innerHTML == 0 && key == '.') display.innerHTML = '0.'
  else if (key == 0 && display.innerHTML.includes('.')) display.innerHTML = display.innerHTML + key;
  else if (key == '.' && display.innerHTML.includes(key)) return;
  else if (key > 0 && display.innerHTML === '0') display.innerHTML = key;
  else display.innerHTML = display.innerHTML + key;
}

/**
 * Unless if display is already zero, set calculator to display zero.
 * 
 * Otherwise, reset operator and operand values to undefined.
 */
function clearDisplay() {
  if (display.innerHTML === '0') {
    operand = undefined;
    operator = undefined;
  } 
  display.innerHTML = '0';
}

/**
 * If more than one operator is applied to two operands, display solution accordingly
 */
function applyOperator(symbol) {
  if (operand == undefined) {
    operand = Number(display.innerHTML);
    operator = symbol;
    display.classList.add('applied-operator');
  }
  else {
    operate();
    operator = symbol;
  }
}

function operate() {
  operand2 = Number(display.innerHTML);
  if (operand == undefined || operator == undefined) {
    display.classList.add('applied-operator');
    return;
  }
  else {
    if (operator == '+') display.innerHTML = operand + operand2;
    else if (operator == '-') display.innerHTML = operand - operand2;
    else if (operator == '*') display.innerHTML = operand * operand2;
    else display.innerHTML = operand / operand2;
  }
  operand = undefined;
  operand2 = undefined;
  operator = undefined;
  display.classList.add('applied-operator')
}