import { Intervalo } from "./intervalo.js";

export class Palpite {
  #console;
  #ultimo;

  constructor(console) {
    this.#console = console;
    this.#ultimo = [];
  }

  intervalo(intervalo) {
    if (intervalo != null) {
      this.#console.escreve(
        `Adivinhe um número entre ${intervalo.min()} e ${intervalo.max()}: `
      );
      this.#ultimo.push(
        new Intervalo(
          intervalo.min(),
          intervalo.max(),
          intervalo.secreto(),
          new Number(this.#console.le())
        )
      );
    }
    return this.#ultimo.at(-1);
  }
}
