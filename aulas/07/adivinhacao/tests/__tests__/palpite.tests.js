import { MemoryStream } from "#helpers/memory-stream.js";
import { Console } from "#src/console.js";
import { Palpite } from "#src/palpite.js";

test(
  "O max e o número do contexto devem ser o que o usuário informou",
  () => {
    const input = new MemoryStream({data: ["57"]});
    const output = new MemoryStream();
    const console = new Console({input: input, output: output});
    const palpite = new Palpite(console);
    const contexto = palpite.turno(
      {
        min: () => 10,
        max: () => 90,
        secreto: () => 42
      }
    );
    expect(contexto.min()).toBe(10);
    expect(contexto.max()).toBe(57);
    expect(contexto.secreto()).toBe(42);
    expect(contexto.numero()).toBe(57);
 }
);

test(
  "Deve exibir ao usuário: \'Adivinhe um número entre 1 e 100:\'",
  () => {
    const input = new MemoryStream({data: ["57"]});
    const output = new MemoryStream();
    const console = new Console({input: input, output: output});
    const palpite = new Palpite(console);
    const contexto = palpite.turno(
      {
        min: () => 1,
        max: () => 100,
        secreto: () => 42
      }
    );
    expect(output.toString()).toBe("Adivinhe um número entre 1 e 100: ");
 }
);

test(
  "Deve exibir ao usuário: \'Adivinhe um número entre 10 e 90:\'",
  () => {
    const input = new MemoryStream({data: ["57"]});
    const output = new MemoryStream();
    const console = new Console({input: input, output: output});
    const palpite = new Palpite(console);
    const contexto = palpite.turno(
      {
        min: () => 10,
        max: () => 90,
        secreto: () => 42
      }
    );
    expect(output.toString()).toBe("Adivinhe um número entre 10 e 90: ");
 }
);
