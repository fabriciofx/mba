import { Palpite } from "./palpite.js";
import { Comparacao } from "./comparacao.js";
import { Intervalo } from "./intervalo.js";

// Interfaces
class Jogo {
  execute() { throw new Error("Método 'execute' precisa ser implementado"); }
}

// Classes
export class Adivinhacao extends Jogo {
  #console;
  #aleatorio;
  #tentativas;

  constructor(console, aleatorio, tentativas = 5) {
    super();
    this.#console = console;
    this.#aleatorio = aleatorio;
    this.#tentativas = tentativas;
  }

  execute() {
    const secreto = this.#aleatorio.valor();
    let min = this.#aleatorio.min();
    let max = this.#aleatorio.max();
    for(let tentativa = 0; tentativa < this.#tentativas; tentativa++) {
      const num = new Palpite(this.#console, min, max).numero();
      const acertou = new Comparacao(secreto, num).resultado();
      if (acertou) {
        this.#console.escreve("Parabéns! Você acertou o número!\n");
      } else {
        const intervalo = new Intervalo(min, max, secreto, num);
        min = intervalo.min();
        max = intervalo.max();
      }
    }
    this.#console.escreve(
      `Suas tentativas acabaram! O número secreto era ${secreto}!\n`
    );
  }
}
