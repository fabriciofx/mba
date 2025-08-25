import { Palpite } from "#src/palpite.js";
import { Comparacao } from "#src/comparacao.js";
import { Intervalo } from "#src/intervalo.js";
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
    const secreto = this.#aleatorio.numero();
    this.#ui.mostre(
      new Despedida(
        new Tentativas(
          new Comparacao(
            secreto,
            new Palpite(this.#ui),
            new Intervalo(
              this.#aleatorio.min(),
              this.#aleatorio.max(),
              secreto
            )
          )
        )
      ).mensagem()
    );
  }
}
