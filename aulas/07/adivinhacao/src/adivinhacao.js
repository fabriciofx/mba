import { Turno } from "#src/turno.js";
import { Avaliacao } from "#src/avaliacao.js";
import { Tentativas } from "#src/tentativas.js";
import { Despedida } from "#src/despedida.js";

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
