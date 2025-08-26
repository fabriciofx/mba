export class Comparacao {
  #secreto;
  #palpite;
  #turnos;

  constructor(secreto, palpite, turno) {
    this.#secreto = secreto;
    this.#palpite = palpite;
    this.#turnos = [ turno ];
  }

  igual() {
    const anterior = this.#turnos.pop();
    const atual = this.#palpite.turno(anterior);
    this.#turnos.push(atual);
    return atual.numero() == this.#secreto;
  }

  palpite() {
    return this.#palpite;
  }
}
