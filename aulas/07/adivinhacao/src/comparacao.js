export class Comparacao {
  #secreto;
  #palpite;
  #contextos;

  constructor(secreto, palpite, contexto) {
    this.#secreto = secreto;
    this.#palpite = palpite;
    this.#contextos = [ contexto ];
  }

  igual() {
    const anterior = this.#contextos.pop();
    const atual = this.#palpite.turno(anterior);
    this.#contextos.push(atual);
    return atual.numero() == this.#secreto;
  }

  palpite() {
    return this.#palpite;
  }
}
