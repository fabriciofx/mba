export class Comparacao {
  #secreto;
  #palpite;
  #turno;

  constructor(secreto, palpite, turno) {
    this.#secreto = secreto;
    this.#palpite = palpite;
    this.#turno = [ turno ];
  }

  igual() {
    this.#turno.push(this.#palpite.turno(this.#turno.pop()));
    return this.#turno.at(0).numero() == this.#secreto;
  }

  palpite() {
    return this.#palpite;
  }
}
