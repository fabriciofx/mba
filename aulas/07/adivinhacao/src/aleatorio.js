// Interface
export class IntAleatorio {
  #min;
  #max;

  constructor(min = 1, max = 100) {
    this.#min = min;
    this.#max = max;
  }

  valor() {
    return Math.floor(Math.random() * (this.#max - this.#min + 1)) + this.#min;
  }

  min() {
    return this.#min;
  }

  max() {
    return this.#max;
  }
}
