import { Avaliacao } from "#src/avaliacao.js";
import { Palpite } from "#src/palpite.js";
import { Console } from "#src/console.js";
import { MemoryStream } from "#helpers/memory-stream.js";

test(
  "Deve verificar se o número informado é diferente do secreto",
  () => {
    const input = new MemoryStream({input: ["33"]});
    const avaliacao = new Avaliacao(
      new Palpite(new Console({input: input})),
      {
        min: () => 1,
        max: () => 100,
        secreto: () => 42,
        numero: () => 35
      }
    ).igual();
    expect(avaliacao).toBe(false);
  }
);

test(
  "Deve verificar se o número informado é igual ao secreto",
  () => {
    const input = new MemoryStream({data: ["42"]});
    const avaliacao = new Avaliacao(
      new Palpite(new Console({input: input})),
      {
        min: () => 1,
        max: () => 100,
        secreto: () => 42,
        numero: () => 42
      }
    ).igual();
    expect(avaliacao).toBe(true);
  }
);
