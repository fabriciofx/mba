import { Turno } from "#src/turno.js";

export class Palpite {
  #ui;
  #turnos;

  constructor(ui) {
    this.#ui = ui;
    this.#turnos = [];
  }

  anterior() {
    return this.#turnos.at(-1);
  }

  turno(turno) {
    this.#ui.mostre(
      `Adivinhe um número entre ${turno.min()} e ${turno.max()}: `
    );
    const atual = new Turno(
      turno.min(),
      turno.max(),
      turno.secreto(),
      Number(this.#ui.leia())
    );
    this.#turnos.push(atual);
    return atual;
  }
}
