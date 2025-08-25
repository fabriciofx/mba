import { Turno } from "#src/turno.js";

export class Palpite {
  #ui;
  #turnos;

  constructor(ui) {
    this.#ui = ui;
    this.#turnos = [];
  }

  turno(turno) {
    if (turno != null) {
      this.#ui.mostre(
        `Adivinhe um número entre ${turno.min()} e ${turno.max()}: `
      );
      this.#turnos.push(
        new Turno(
          turno.min(),
          turno.max(),
          turno.secreto(),
          Number(this.#ui.leia())
        )
      );
    }
    return this.#turnos.pop();
  }
}
