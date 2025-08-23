export class Comparacao {
  #secreto;
  #palpite;
  #intervalo;

  constructor(secreto, palpite, intervalo) {
    this.#secreto = secreto;
    this.#palpite = palpite;
    this.#intervalo = [ intervalo ];
  }

  igual() {
    this.#intervalo.push(this.#palpite.intervalo(this.#intervalo.pop()));
    return this.#intervalo.at(0).numero() == this.#secreto;
  }

  palpite() {
    return this.#palpite;
  }
}
