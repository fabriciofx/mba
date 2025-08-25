import { MemoryStream } from "#helpers/memory-stream.js";
import { Console } from "#src/console.js";
import { Palpite } from "#src/palpite.js";

test(
  "O max e o número do intervalo devem ser o que o usuário informou",
  () => {
    const input = new MemoryStream({data: ["57"]});
    const output = new MemoryStream();
    const console = new Console({input: input, output: output});
    const palpite = new Palpite(console);
    const intervalo = palpite.intervalo(
      {
        min: () => 10, max: () => 90, secreto: () => 42
      }
    );
    expect(intervalo.min()).toBe(10);
    expect(intervalo.max()).toBe(57);
    expect(intervalo.secreto()).toBe(42);
    expect(intervalo.numero()).toBe(57);
 }
);
