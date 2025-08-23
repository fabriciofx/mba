import { Palpite } from "./palpite.js";
import { Comparacao } from "./comparacao.js";
import { Intervalo } from "./intervalo.js";
import { Tentativas } from "./tentativas.js";
import { Despedida } from "./despedida.js";

// Interfaces
class Jogo {
  execute() { throw new Error("Método 'execute' precisa ser implementado"); }
}

// Classes
export class Adivinhacao extends Jogo {
  #console;
  #aleatorio;

  constructor(console, aleatorio) {
    super();
    this.#console = console;
    this.#aleatorio = aleatorio;
  }

  execute() {
    const secreto = this.#aleatorio.valor();
    this.#console.escreve(
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
