export class Palpite {
  #console;
  #min;
  #max;

  constructor(console, min, max) {
    this.#console = console;
    this.#min = min;
    this.#max = max;
  }

  numero() {
      this.#console.escreve(
        `Adivinhe um número entre ${this.#min} e ${this.#max}: `
      );
      return Number(this.#console.le());
  }
}
