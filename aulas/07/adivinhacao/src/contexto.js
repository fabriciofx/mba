export class Contexto {
  min() {
    throw new Error("Método 'min()' precisa ser implementado.");
  }

  max() {
    throw new Error("Método 'max()' precisa ser implementado.");
  }

  numero() {
    throw new Error("Método 'numero()' precisa ser implementado.");
  }

  secreto() {
    throw new Error("Método 'secreto()' precisa ser implementado.");
  }
}


export class Esmagador extends Contexto {
  #min;
  #max;
  #secreto;
  #numero;

  constructor(min, max, secreto, numero) {
    super();
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

export class Aleatorio extends Contexto {
  #min;
  #max;
  #secreto;

  constructor(min = 1, max = 100) {
    super();
    this.#min = min;
    this.#max = max;
    this.#secreto = Math.floor(Math.random() * (max - min + 1)) + min;
    Object.freeze(this);
  }

  min() {
    return this.#min;
  }

  max() {
    return this.#max;
  }

  numero() {
    return this.#max;
  }

  secreto() {
    return this.#secreto;
  }
}

export class Planejado extends Contexto {
  #min;
  #max;
  #numero;
  #secreto;

  constructor(min = 1, max = 100, numero = 100, secreto = 42) {
    super();
    this.#min = min;
    this.#max = max;
    this.#numero = numero;
    this.#secreto = secreto;
  }

  min() {
    return this.#min;
  }

  max() {
    return this.#max;
  }

  numero() {
    return this.#numero;
  }

  secreto() {
    return this.#secreto;
  }
}
