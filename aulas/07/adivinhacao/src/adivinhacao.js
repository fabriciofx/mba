import { Palpite } from "./palpite.js";
import { Comparacao } from "./comparacao.js";
import { Intervalo } from "./intervalo.js";
import { Tentativas } from "./tentativas.js";
import { Despedida } from "./despedida.js";

export class Adivinhacao {
  #console;
  #aleatorio;

  constructor(console, aleatorio) {
    this.#console = console;
    this.#aleatorio = aleatorio;
  }

  execute() {
    const secreto = this.#aleatorio.numero();
    this.#console.mostre(
      new Despedida(
        new Tentativas(
          new Comparacao(
            secreto,
            new Palpite(this.#console),
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
