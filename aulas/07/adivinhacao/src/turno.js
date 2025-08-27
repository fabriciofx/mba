import { Esmagador } from "#src/index.js";

export class Turno {
  #ui;
  #contextos;

  constructor(ui) {
    this.#ui = ui;
    this.#contextos = [];
    Object.freeze(this);
  }

  anterior() {
    return this.#contextos.at(-1);
  }

  contexto(anterior) {
    this.#ui.mostre(
      `Adivinhe um número entre ${anterior.min()} e ${anterior.max()}: `
    );
    const numero = Number(this.#ui.leia());
    const atual = new Esmagador(
      anterior.min(),
      anterior.max(),
      anterior.secreto(),
      numero
    );
    this.#contextos.push(atual);
    return atual;
  }
}
