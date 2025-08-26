export class Tentativas {
  #avalicao;
  #max;

  constructor(avaliacao, max = 10) {
    this.#avalicao = avaliacao;
    this.#max = max;
  }

  partidas() {
    let t = 0;
    while (t < this.#max && !this.#avalicao.igual()) {
      t++;
    }
    return t < this.#max
  }

  secreto() {
    return this.#avalicao.palpite().anterior().secreto();
  }
}
