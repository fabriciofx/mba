import { Turno } from "#src/turno.js";
import { Avaliacao } from "#src/avaliacao.js";
import { Inicial } from "#src/contexto.js";
import { Tentativas } from "#src/tentativas.js";
import { Despedida } from "#src/despedida.js";

export class Adivinhacao {
  #ui;
  #aleatorio;

  constructor(ui, aleatorio) {
    this.#ui = ui;
    this.#aleatorio = aleatorio;
  }

  execute() {
    this.#ui.mostre(
      new Despedida(
        new Tentativas(
          new Avaliacao(
            new Turno(this.#ui),
            new Inicial(this.#aleatorio)
          )
        )
      ).mensagem()
    );
  }
}
