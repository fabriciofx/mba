import { MemoryStream } from "#helpers/index.js";
import { Console, Turno, Determinado } from "#src/index.js";

test(
  "O contexto do deve estar de acordo com as informações iniciais",
  () => {
    const input = new MemoryStream({data: ["57"]});
    const output = new MemoryStream();
    const console = new Console({input: input, output: output});
    const turno = new Turno(console);
    const inicial = new Determinado(10, 90, 42, 90);
    const contexto = turno.contexto(inicial);
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
    const turno = new Turno(console);
    const inicial = new Determinado(1, 100, 42, 100);
    turno.contexto(inicial);
    expect(output.toString()).toBe("Adivinhe um número entre 1 e 100: ");
 }
);

test(
  "Deve exibir \'Adivinhe um número entre 10 e 90:\'",
  () => {
    const input = new MemoryStream({data: ["57"]});
    const output = new MemoryStream();
    const console = new Console({input: input, output: output});
    const turno = new Turno(console);
    const inicial = new Determinado(10, 90, 42, 90);
    turno.contexto(inicial);
    expect(output.toString()).toBe("Adivinhe um número entre 10 e 90: ");
 }
);
