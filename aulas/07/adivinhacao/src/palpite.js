import { Intervalo } from "./intervalo.js";

export class Palpite {
  #ui;
  #ultimo;

  constructor(ui) {
    this.#ui = ui;
    this.#ultimo = [];
  }

  intervalo(intervalo) {
    if (intervalo != null) {
      this.#ui.mostre(
        `Adivinhe um número entre ${intervalo.min()} e ${intervalo.max()}: `
      );
      this.#ultimo.push(
        new Intervalo(
          intervalo.min(),
          intervalo.max(),
          intervalo.secreto(),
          new Number(this.#ui.leia())
        )
      );
    }
    return this.#ultimo.at(-1);
  }
}
