import { Tentativas } from "#src/index.js";

test(
  "Deve verificar se o número secreto está correto",
  () => {
    const secreto = 42;
    const turno = {
      atual: () => ({
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
    const avaliacao = {
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

test(
  "Deve verificar se executa a avaliação de acordo com o máximo especificado",
  () => {
    let execucoes = 0;
    const avaliacao = {
      igual: () => {
        execucoes++;
        return false;
      }
    }
    const tentativas = new Tentativas(avaliacao, 5);
    tentativas.avalia();
    expect(execucoes).toBe(5);
  }
);
