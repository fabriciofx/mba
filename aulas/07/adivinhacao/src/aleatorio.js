// Interface
class Aleatorio {
  valor() { throw new Error("Método 'valor' precisa ser implementado"); }
}

export class IntAleatorio extends Aleatorio {
  #min;
  #max;

  constructor(min = 1, max = 100) {
    super();
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
