export class Tentativas {
  #comparacao;
  #max;

  constructor(comparacao, max = 10) {
    this.#comparacao = comparacao;
    this.#max = max;
  }

  partidas() {
    let t = 0;
    while (t < this.#max && !this.#comparacao.igual()) {
      t++;
    }
    return t < this.#max
  }

  secreto() {
    return this.#comparacao.palpite().turno().secreto();
  }
}
