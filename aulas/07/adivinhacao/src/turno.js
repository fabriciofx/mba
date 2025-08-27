import { Espremido } from "#src/index.js";

export class Turno {
  #ui;
  #contextos;

  constructor(ui) {
    this.#ui = ui;
    this.#contextos = [];
    Object.freeze(this);
  }

  atual() {
    return this.#contextos.at(-1);
  }

  contexto(atual) {
    this.#ui.mostre(
      `Adivinhe um número entre ${atual.min()} e ${atual.max()}: `
    );
    const numero = Number(this.#ui.leia());
    const proximo = new Espremido(
      atual.min(),
      atual.max(),
      atual.secreto(),
      numero
    );
    this.#contextos.push(proximo);
    return proximo;
  }
}
