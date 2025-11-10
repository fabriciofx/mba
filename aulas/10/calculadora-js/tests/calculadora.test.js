import { Calculadora } from "../src/calculadora.js"

test(
  "somar 2 e 3 deve dar 5",
  () => {
    expect(new Calculadora(2, 3).soma()).toBe("A soma entre 2 e 3 é 5");
  }
);

test(
  "multiplicar 2 e 3 deve dar 6",
  () => {
    expect(new Calculadora(2, 3).mult()).toBe(
      "A multiplicação entre 2 e 3 é 6"
    );
  }
);

test(
  "subtrair 5 e 2 deve dar 3",
  () => {
    expect(new Calculadora(5, 2).sub()).toBe(
      "A subtração entre 5 e 2 é 3"
    );
  }
);

test(
  "Dividir 3 e 2 deve dar 1.5",
  () => {
    expect(new Calculadora(3, 2).div()).toBe(
      "A divisão entre 3 e 2 é 1.5"
    );
  }
);

test(
  "Dividir 2 e 3 deve dar 0.66666667",
  () => {
    expect(new Calculadora(2, 3).div()).toBe(
      "A divisão entre 2 e 3 é 0.66666667"
    );
  }
);

test(
  "Dividir 2 e 0 deve dar erro",
  () => {
    expect(new Calculadora(2, 0).div()).toBe(
      "Erro: não é possível realizar a divisão de 2 por zero!"
    );
  }
);
