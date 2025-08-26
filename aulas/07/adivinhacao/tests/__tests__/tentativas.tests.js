import { Tentativas } from "#src/tentativas.js";

test(
  "Deve verificar se o número secreto está correto",
  () => {
    const secreto = 42;
    const palpite = {
      anterior: () => ({
        secreto: () => secreto
      })
    };
    const avaliacao = {
      palpite: () => palpite,
      igual: () => false
    };
    const tentativas = new Tentativas(avaliacao, 5);
    expect(tentativas.secreto()).toBe(secreto);
  }
);
