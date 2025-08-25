export class Turno {
  #min;
  #max;
  #secreto;
  #numero;

  constructor(min, max, secreto, numero = 100) {
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

  numero() {
    return this.#numero;
  }

  secreto() {
    return this.#secreto;
  }
}
