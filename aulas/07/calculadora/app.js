import { Calculadora } from "./calculadora.js";
import rls from "readline-sync";

const num1 = Number(rls.question("Digite um número: "));
const num2 = Number(rls.question("Digite outro número: "));
const op = rls.question("Digite a operação (+, -, * ou /): ");
let msg;
switch(op) {
  case "+":
    msg = new Calculadora(num1, num2).soma();
    break;
  case "-":
    msg = new Calculadora(num1, num2).sub();
    break;
  case "*":
    msg = new Calculadora(num1, num2).mult();
    break;
  case "/":
    msg = new Calculadora(num1, num2).div();
    break;
  default:
    msg = `Operação ${op} é inválida. Informe uma operação válida (+, -, * ou /)`;
    break;
}
console.log(msg)
