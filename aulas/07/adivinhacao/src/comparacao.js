export class Comparacao {
  #secreto;
  #numero;

  constructor(secreto, numero) {
    this.#secreto = secreto;
    this.#numero = numero;
  }

  resultado() {
    return this.#numero === this.#secreto;
  }
}
