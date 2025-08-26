export class Avaliacao {
  #palpite;
  #contextos;

  constructor(palpite, inicial) {
    this.#palpite = palpite;
    this.#contextos = [ inicial ];
  }

  igual() {
    const anterior = this.#contextos.pop();
    const atual = this.#palpite.turno(anterior);
    this.#contextos.push(atual);
    return atual.numero() == atual.secreto();
  }

  palpite() {
    return this.#palpite;
  }
}
