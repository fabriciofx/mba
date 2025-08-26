export class Avaliacao {
  #turno;
  #contextos;

  constructor(turno, inicial) {
    this.#turno = turno;
    this.#contextos = [ inicial ];
  }

  igual() {
    const anterior = this.#contextos.pop();
    const atual = this.#turno.contexto(anterior);
    this.#contextos.push(atual);
    return atual.numero() == atual.secreto();
  }

  turno() {
    return this.#turno;
  }
}
