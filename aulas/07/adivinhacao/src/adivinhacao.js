import { Palpite } from "#src/palpite.js";
import { Comparacao } from "#src/comparacao.js";
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
          new Comparacao(
            new Palpite(this.#ui),
            new Inicial(this.#aleatorio)
          )
        )
      ).mensagem()
    );
  }
}
