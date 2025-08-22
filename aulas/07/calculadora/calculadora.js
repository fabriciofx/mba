const rls = require("readline-sync");

const num1 = Number(rls.question("Digite um número: "));
const num2 = Number(rls.question("Digite outro número: "));
const op = rls.question("Digite a operação (+, -, * ou /): ");
let msg;
switch(op) {
  case "+": {
      const result = num1 + num2;
      msg = `A soma entre ${num1} e ${num2} é ${result}`;
    }
    break;
  case "-": {
      const result = num1 - num2;
      msg = `A subtração entre ${num1} e ${num2} é ${result}`;
    }
    break;
  case "*": {
      const result = num1 * num2;
      msg = `A multiplicação entre ${num1} e ${num2} é ${result}`;
    }
    break;
  case "/": {
      const result = num1 / num2;
      if (num2 === 0) {
        msg = `Erro: não é possível realizar a divisão de ${num1} por zero!`;
      } else {
        msg = `A divisão entre ${num1} e ${num2} é ${result}`;
      }
    }
    break;
  default:
    msg = `Operação ${op} é inválida. Informe uma operação válida (+, -, * ou /)`;
    break;
}
console.log(msg)
