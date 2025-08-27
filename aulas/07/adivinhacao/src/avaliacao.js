import { Value } from "#src/index.js";

export class Avaliacao {
  #turno;
  #anterior;

  constructor(turno, inicial) {
    this.#turno = turno;
    this.#anterior = new Value(inicial);
    Object.freeze(this);
  }

  igual() {
    const anterior = this.#anterior.read();
    const atual = this.#turno.contexto(anterior);
    this.#anterior.write(atual);
    return atual.numero() == atual.secreto();
  }

  turno() {
    return this.#turno;
  }
}
