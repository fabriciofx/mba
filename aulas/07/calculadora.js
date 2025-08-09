const readline = require("readline");

function input(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => {
    rl.question(message, (value) => {
      rl.close();
      resolve(value);
    });
  });
}

(async () => {
  const num1 = await input("Digite um número: ");
  const num2 = await input("Digite outro número: ");
  const op = await input("Digite a operação (+, -, * ou /): ");
  let result = "";
  switch(op) {
      case '+':
          result = Number(num1) + Number(num2);
          break;
      case '-':
          result = Number(num1) - Number(num2);
          break;
      case '*':
          result = Number(num1) * Number(num2);
          break;
      case '/':
          result = Number(num1) / Number(num2);
          break;
  }
  console.log(`${num1} ${op} ${num2} = ${result}`)
})();
