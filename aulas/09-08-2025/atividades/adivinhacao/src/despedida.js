export class Despedida {
  #tentativas

  constructor(tentativas) {
    this.#tentativas = tentativas;
    Object.freeze(this);
  }

  mensagem() {
    let msg;
    if (this.#tentativas.avalia()) {
      msg = "Parabéns! Você acertou o número!\n";
    } else {
      msg = "Suas tentativas acabaram! O número secreto era " +
        `${this.#tentativas.secreto()}!\n`;
    }
    return msg;
  }
}
