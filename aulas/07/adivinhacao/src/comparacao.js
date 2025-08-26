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
    this.#turnos.push(this.#palpite.turno(this.#turnos.pop()));
    return this.#turnos.at(0).numero() == this.#secreto;
  }

  palpite() {
    return this.#palpite;
  }
}
