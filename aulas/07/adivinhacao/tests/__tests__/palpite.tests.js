import { MemoryStream } from "#helpers/memory-stream.js";
import { Console } from "#src/console.js";
import { Palpite } from "#src/palpite.js";

test(
  "O max e o número do turno devem ser o que o usuário informou",
  () => {
    const input = new MemoryStream({data: ["57"]});
    const output = new MemoryStream();
    const console = new Console({input: input, output: output});
    const palpite = new Palpite(console);
    const turno = palpite.turno(
      {
        min: () => 10, max: () => 90, secreto: () => 42
      }
    );
    expect(turno.min()).toBe(10);
    expect(turno.max()).toBe(57);
    expect(turno.secreto()).toBe(42);
    expect(turno.numero()).toBe(57);
 }
);
