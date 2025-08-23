import { Palpite } from "./palpite.js";
import { Comparacao } from "./comparacao.js";
import { Intervalo } from "./intervalo.js";
import { Tentativas } from "./tentativas.js";
import { Despedida } from "./despedida.js";

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
