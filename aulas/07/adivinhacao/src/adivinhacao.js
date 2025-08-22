// Interfaces
class Jogo {
  execute() { throw new Error("Método 'executa' precisa ser implementado"); }
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
    const escolhido = this.#aleatorio.valor();
    let min = this.#aleatorio.min();
    let max = this.#aleatorio.max();
    let acertou = false;
    this.#console.escreve(`Escolhido: ${escolhido}\n`)
    for(let tentativa = 0; tentativa < this.#tentativas; tentativa++) {
      this.#console.escreve(`Adivinhe um número entre ${min} e ${max}: `);
      let num = Number(this.#console.le());
      if (num === escolhido) {
        this.#console.escreve("Parabéns! Você acertou o número!\n");
        acertou = true;
        break;
      } else {
        if (num > escolhido) {
          max = num;
        }
        if (num < escolhido) {
          min = num;
        }
      }
    }
    if (!acertou) {
      this.#console.escreve(
        `Suas tentativas acabaram! O número oculto era ${escolhido}!\n`
      );
    }
  }
}
