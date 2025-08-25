import { Turno } from "#src/turno.js";

export class Palpite {
  #ui;
  #ultimo;

  constructor(ui) {
    this.#ui = ui;
    this.#ultimo = [];
  }

  turno(turno) {
    if (turno != null) {
      this.#ui.mostre(
        `Adivinhe um número entre ${turno.min()} e ${turno.max()}: `
      );
      this.#ultimo.push(
        new Turno(
          turno.min(),
          turno.max(),
          turno.secreto(),
          Number(this.#ui.leia())
        )
      );
    }
    return this.#ultimo.at(-1);
  }
}
