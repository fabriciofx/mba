import { MemoryStream } from "#helpers/memory-stream.js";
import { Console } from "#src/console.js";
import { Palpite } from "#src/palpite.js";

test(
  "O contexto do deve estar de acordo com as informações iniciais",
  () => {
    const input = new MemoryStream({data: ["57"]});
    const output = new MemoryStream();
    const console = new Console({input: input, output: output});
    const palpite = new Palpite(console);
    const inicial = {
      min: () => 10,
      max: () => 90,
      secreto: () => 42
    };
    const contexto = palpite.turno(inicial);
    expect(contexto.min()).toBe(10);
    expect(contexto.max()).toBe(57);
    expect(contexto.secreto()).toBe(42);
    expect(contexto.numero()).toBe(57);
 }
);

test(
  "Deve exibir \'Adivinhe um número entre 1 e 100:\'",
  () => {
    const input = new MemoryStream({data: ["57"]});
    const output = new MemoryStream();
    const console = new Console({input: input, output: output});
    const palpite = new Palpite(console);
    const inicial = {
      min: () => 1,
      max: () => 100,
      secreto: () => 42
    };
    palpite.turno(inicial);
    expect(output.toString()).toBe("Adivinhe um número entre 1 e 100: ");
 }
);

test(
  "Deve exibir \'Adivinhe um número entre 10 e 90:\'",
  () => {
    const input = new MemoryStream({data: ["57"]});
    const output = new MemoryStream();
    const console = new Console({input: input, output: output});
    const palpite = new Palpite(console);
    const inicial = {
      min: () => 10,
      max: () => 90,
      secreto: () => 42
    };
    palpite.turno(inicial);
    expect(output.toString()).toBe("Adivinhe um número entre 10 e 90: ");
 }
);
