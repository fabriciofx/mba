import { Esmagador } from "#src/contexto.js";

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
    const atual = new Esmagador(
      anterior.min(),
      anterior.max(),
      anterior.secreto(),
      Number(this.#ui.leia())
    );
    this.#contextos.push(atual);
    return atual;
  }
}
