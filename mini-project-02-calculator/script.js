let expression = "";

function appendNumber(num) {
  expression += num;
  document.getElementById("display").value = expression;
}

function appendOperator(op) {
  expression += op;
  document.getElementById("display").value = expression;
}

function calculate() {
  try {
    const result = eval(expression);
    document.getElementById("display").value = result;
    expression = result.toString(); // allow chaining
  } catch {
    document.getElementById("display").value = "Error";
    expression = "";
  }
}

function clearDisplay() {
  expression = "";
  document.getElementById("display").value = "";
}

function squareRoot() {
  try {
    const result = Math.sqrt(eval(expression));
    document.getElementById("display").value = result;
    expression = result.toString();
  } catch {
    document.getElementById("display").value = "Error";
    expression = "";
  }
}
function percentage() {
  try {
    const result = eval(expression) / 100;
    document.getElementById("display").value = result;
    expression = result.toString();
  } catch {
    document.getElementById("display").value = "Error";
    expression = "";
  }
}
function appendDecimal() {
  if (!expression.includes(".")) {
    expression += ".";
    document.getElementById("display").value = expression;
  }
}
function clearEntry() {
  if (expression.length > 0) {
    expression = expression.slice(0, -1); // remove last character
    document.getElementById("display").value = expression;
  }
}
