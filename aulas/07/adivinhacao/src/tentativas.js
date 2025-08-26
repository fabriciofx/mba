export class Tentativas {
  #avaliacao;
  #max;

  constructor(avaliacao, max = 10) {
    this.#avaliacao = avaliacao;
    this.#max = max;
    Object.freeze(this);
  }

  avalia() {
    let t = 0;
    while (t < this.#max && !this.#avaliacao.igual()) {
      t++;
    }
    return t < this.#max
  }

  secreto() {
    return this.#avaliacao.turno().anterior().secreto();
  }
}
