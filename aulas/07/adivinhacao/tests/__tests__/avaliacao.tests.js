import { MemoryStream } from "#helpers/index.js";
import { Avaliacao, Turno, Console, Planejado } from "#src/index.js";

test(
  "Deve verificar se o número informado é diferente do secreto",
  () => {
    const input = new MemoryStream({input: ["33"]});
    const avaliacao = new Avaliacao(
      new Turno(new Console({input: input})),
      new Planejado(1, 100, 35, 42)
    );
    expect(avaliacao.igual()).toBe(false);
  }
);

test(
  "Deve verificar se o número informado é igual ao secreto",
  () => {
    const input = new MemoryStream({data: ["42"]});
    const avaliacao = new Avaliacao(
      new Turno(new Console({input: input})),
      new Planejado(1, 100, 42, 42)
    );
    expect(avaliacao.igual()).toBe(true);
  }
);
