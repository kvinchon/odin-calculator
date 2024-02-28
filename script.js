const OPERATORS = /[\+\-\x\/]/;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    alert("Nice try! You can't divide by zero!");
    return 0;
  }
  return a / b;
}

function operate(operator, num1, num2) {
  let result = 0;

  switch (operator) {
    case '+':
      result = add(num1, num2);
      break;
    case '-':
      result = subtract(num1, num2);
      break;
    case 'x':
      result = multiply(num1, num2);
      break;
    case '/':
      result = divide(num1, num2);
      break;
    default:
      alert('Unknown operator');
      break;
  }

  return Math.round(result * 1000) / 1000;
}

function displayNumber(e) {
  const arr = display.value.split(' ');
  const currentNumber = arr[arr.length - 1];

  // replace numbers starting with a zero
  if (
    currentNumber == 0 &&
    !currentNumber.includes('.') &&
    currentNumber !== ''
  )
    display.value = display.value.slice(0, -1);

  display.value += e.target.value;
}

function displayPoint() {
  const arr = display.value.split(' ');
  const currentNumber = arr[arr.length - 1];

  if (currentNumber.includes('.')) return;

  if (display.value === '' || currentNumber === '') display.value += 0;
  display.value += '.';
}

function displayOperator(e) {
  const arr = display.value.split(' ');
  const currentChar = arr[arr.length - 1];

  if (display.value === '') return;

  if (currentChar === '') {
    display.value = display.value.slice(0, -3) + e.target.value;
  } else {
    display.value += e.target.value;
  }
}

function getResult() {
  let result = 0;
  let operations = display.value.split(' ');

  if (operations.length < 3) return;

  while (operations.length >= 3 && operations[2] !== '') {
    let firstNumber = parseFloat(operations[0]);
    let secondNumber = parseFloat(operations[2]);
    let operator = operations[1];

    result = operate(operator, firstNumber, secondNumber);

    // clear current operation
    operations.splice(0, 3, result);
  }

  display.value = operations.join(' ');
}

function getSquareRoot() {
  const input = display.value.split(' ');

  if (input.length > 1) getResult();

  display.value =
    Math.round(Math.sqrt(parseFloat(display.value)) * 1000) / 1000;
}

function clearDisplay() {
  display.value = '';
}

function undoAction() {
  const arr = display.value.split(' ');
  const currentChar = arr[arr.length - 1];

  if (currentChar === '') {
    display.value = display.value.slice(0, -3);
  } else {
    display.value = display.value.slice(0, -1);
  }
}

const display = document.querySelector('#display');
const numbers = document.querySelectorAll('.number');
const point = document.querySelector('#point');
const operators = document.querySelectorAll('.operator');
const root = document.querySelector('#root');
const equal = document.querySelector('#equal');
const clear = document.querySelector('#clear');
const undo = document.querySelector('#undo');

numbers.forEach((number) => {
  number.addEventListener('click', displayNumber);
});
operators.forEach((operator) => {
  operator.addEventListener('click', displayOperator);
});

point.addEventListener('click', displayPoint);
root.addEventListener('click', getSquareRoot);
equal.addEventListener('click', getResult);
clear.addEventListener('click', clearDisplay);
undo.addEventListener('click', undoAction);
