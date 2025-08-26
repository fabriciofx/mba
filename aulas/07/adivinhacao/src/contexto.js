export class Contexto {
  #min;
  #max;
  #secreto;
  #numero;

  constructor(min, max, secreto, numero) {
    this.#min = min;
    this.#max = max;
    this.#secreto = secreto;
    this.#numero = numero;
    Object.freeze(this);
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

export class Inicial extends Contexto {
  #aleatorio;

  constructor(aleatorio) {
    super();
    this.#aleatorio = aleatorio;
  }

  min() {
    return this.#aleatorio.min();
  }

  max() {
    return this.#aleatorio.max();
  }

  numero() {
    return this.#aleatorio.max();
  }

  secreto() {
    return this.#aleatorio.numero();
  }
}
