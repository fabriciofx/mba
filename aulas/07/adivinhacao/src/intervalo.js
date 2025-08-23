export class Intervalo {
  #min;
  #max;
  #secreto;
  #numero;

  constructor(min, max, secreto, numero) {
    this.#min = min;
    this.#max = max;
    this.#secreto = secreto;
    this.#numero = numero;
  }

  min() {
    let min = this.#min;
    if (this.#numero < this.#secreto) {
      min = this.#numero;
    }
    return min;
  }

  max() {
    let max = this.#max;
    if (this.#numero > this.#secreto) {
      max = this.#numero;
    }
    return max;
  }
}
