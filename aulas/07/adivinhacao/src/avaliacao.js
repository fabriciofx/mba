export class Avaliacao {
  #turno;
  #anterior;

  constructor(turno, inicial) {
    this.#turno = turno;
    this.#anterior = [ inicial ];
    Object.freeze(this);
  }

  igual() {
    const anterior = this.#anterior.pop();
    const atual = this.#turno.contexto(anterior);
    this.#anterior.push(atual);
    return atual.numero() == atual.secreto();
  }

  turno() {
    return this.#turno;
  }
}
