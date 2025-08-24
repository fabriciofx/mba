import { Readable } from "stream";
import { WritableStream } from "memory-streams";
import { Console } from "../../src/console.js"

test(
  "Mostra uma mensagem",
  () => {
    const stream = new WritableStream();
    const console = new Console({output: stream});
    const msg = "Olá, mundo!";
    console.mostre(msg);
    expect(stream.toString()).toBe(msg);
  }
);

test(
  "Mostra duas mensagens seguidas",
  () => {
    const stream = new WritableStream();
    const console = new Console({output: stream});
    const msg1 = "Olá, mundo!\n";
    const msg2 = "A vida é bela!\n";
    console.mostre(msg1);
    console.mostre(msg2);
    expect(stream.toString()).toBe(msg1 + msg2);
  }
);

test(
  "Lê um dado",
  () => {
    const msg = "Olá, mundo!";
    const stream = Readable.from([msg]);
    const console = new Console({input: stream});
    const dados = console.leia();
    expect(dados).toBe(msg);
  }
);
