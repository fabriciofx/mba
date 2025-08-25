import { MemoryStream } from "#helpers/memory-stream.js";
import { Console } from "#src/console.js";

test(
  "Mostra uma mensagem",
  () => {
    const stream = new MemoryStream();
    const console = new Console({output: stream});
    const msg = "Olá, mundo!";
    console.mostre(msg);
    expect(stream.toString()).toBe(msg);
  }
);

test(
  "Mostra duas mensagens seguidas",
  () => {
    const stream = new MemoryStream();
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
    const stream = new MemoryStream({data: [msg]});
    const console = new Console({input: stream});
    const dados = console.leia();
    expect(dados).toBe(msg);
  }
);

test(
  "Tenta ler de um input vazio",
  () => {
    const input = new MemoryStream();
    const console = new Console({input: input});
    expect(console.leia()).toBe("");
 }
);

test(
  "Deve ler duas mensagens seguidas",
  () => {
    const msg1 = "Olá, mundo!\n";
    const msg2 = "A vida é bela!\n";
    const input = new MemoryStream({data: [msg1, msg2]});
    const output = new MemoryStream();
    const console = new Console({input: input, output: output});
    expect(console.leia()).toBe(msg1);
    // expect(console.leia()).toBe(msg2);
  }
);
