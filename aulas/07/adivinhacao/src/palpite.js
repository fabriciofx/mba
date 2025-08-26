import { Contexto } from "#src/contexto.js";

export class Palpite {
  #ui;
  #contextos;

  constructor(ui) {
    this.#ui = ui;
    this.#contextos = [];
  }

  anterior() {
    return this.#contextos.at(-1);
  }

  turno(contexto) {
    this.#ui.mostre(
      `Adivinhe um número entre ${contexto.min()} e ${contexto.max()}: `
    );
    const atual = new Contexto(
      contexto.min(),
      contexto.max(),
      contexto.secreto(),
      Number(this.#ui.leia())
    );
    this.#contextos.push(atual);
    return atual;
  }
}
