import { Despedida, Tentativas, Avaliacao, Turno } from "#src/index.js";

export class Adivinhacao {
  #ui;
  #inicial;

  constructor(ui, inicial) {
    this.#ui = ui;
    this.#inicial = inicial;
    Object.freeze(this);
  }

  execute() {
    this.#ui.mostre(
      new Despedida(
        new Tentativas(
          new Avaliacao(
            new Turno(this.#ui),
            this.#inicial
          )
        )
      ).mensagem()
    );
  }
}
