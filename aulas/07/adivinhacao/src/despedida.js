export class Despedida {
  #tentativas

  constructor(tentativas) {
    this.#tentativas = tentativas;
  }

  mensagem() {
    let msg;
    if (this.#tentativas.partidas()) {
      msg = "Parabéns! Você acertou o número!\n";
    } else {
      msg = "Suas tentativas acabaram! O número secreto era " +
        `${this.#tentativas.secreto()}!\n`;
    }
    return msg;
  }
}
