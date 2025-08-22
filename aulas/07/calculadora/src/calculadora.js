export class Calculadora {
  #num1;
  #num2;
  #digitos

  constructor(num1, num2, digitos = 8) {
    this.#num1 = num1;
    this.#num2 = num2;
    this.#digitos = digitos;
  }

  soma() {
    const result = this.#num1 + this.#num2;
    return `A soma entre ${this.#num1} e ${this.#num2} é ${result}`;
  }

  sub() {
    const result = this.#num1 - this.#num2;
    return `A subtração entre ${this.#num1} e ${this.#num2} é ${result}`;
  }

  mult() {
    const result = this.#num1 * this.#num2;
    return `A multiplicação entre ${this.#num1} e ${this.#num2} é ${result}`;
  }

  div() {
    let msg;
    const result = Number((this.#num1 / this.#num2).toFixed(this.#digitos));
    if (this.#num2 === 0) {
      msg = `Erro: não é possível realizar a divisão de ${this.#num1} por zero!`;
    } else {
      msg = `A divisão entre ${this.#num1} e ${this.#num2} é ${result}`;
    }
    return msg;
  }
}
