const rls = require("readline-sync");

const num1 = Number(rls.question("Digite um número: "));
const num2 = Number(rls.question("Digite outro número: "));
const op = rls.question("Digite a operação (+, -, * ou /): ");
let result = "";
switch(op) {
  case '+':
      result = num1 + num2;
      break;
  case '-':
      result = num1 - num2;
      break;
  case '*':
      result = num1 * num2;
      break;
  case '/':
      result = num1 / num2;
      break;
}
console.log(`${num1} ${op} ${num2} = ${result}`)
