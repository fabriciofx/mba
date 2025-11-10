import { Value } from "#src/index.js";

export class Avaliacao {
  #turno;
  #atual;

  constructor(turno, inicial) {
    this.#turno = turno;
    this.#atual = new Value(inicial);
    Object.freeze(this);
  }

  igual() {
    const atual = this.#atual.read();
    const proximo = this.#turno.contexto(atual);
    this.#atual.write(proximo);
    return proximo.numero() == proximo.secreto();
  }

  turno() {
    return this.#turno;
  }
}
