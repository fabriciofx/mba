// Interface
export class Aleatorio {
  #min;
  #max;

  constructor(min = 1, max = 100) {
    this.#min = min;
    this.#max = max;
  }

  numero() {
    return Math.floor(Math.random() * (this.#max - this.#min + 1)) + this.#min;
  }

  min() {
    return this.#min;
  }

  max() {
    return this.#max;
  }
}
