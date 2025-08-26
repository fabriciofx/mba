import { Tentativas } from "#src/tentativas.js";

test(
  "Deve verificar se o número secreto está correto",
  () => {
    const secreto = 42;
    const turno = {
      anterior: () => ({
        secreto: () => secreto
      })
    };
    const avaliacao = {
      turno: () => turno,
      igual: () => false
    };
    const tentativas = new Tentativas(avaliacao, 5);
    expect(tentativas.secreto()).toBe(secreto);
  }
);

test(
  "Deve verificar se executa a avaliação 10 vezes",
  () => {
    let execucoes = 0;
    const turno = {
      anterior: () => ({
        secreto: () => 42
      })
    };
    const avaliacao = {
      turno: () => turno,
      igual: () => {
        execucoes++;
        return false;
      }
    };
    const tentativas = new Tentativas(avaliacao);
    tentativas.avalia();
    expect(execucoes).toBe(10);
  }
);
