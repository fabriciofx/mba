import { MemoryStream } from "../helpers/memory-stream.js";

test(
  "Escreve no stream",
  () => {
    const msg = "Olá, mundo!";
    const stream = new MemoryStream();
    stream.write(msg);
    expect(stream.toString()).toBe(msg);
  }
);

test(
  "Escreve no stream duas vezes seguidas",
  () => {
    const msg1 = "Olá, mundo!";
    const msg2 = "A vida é bela!";
    const stream = new MemoryStream();
    stream.write(msg1);
    stream.write(msg2);
    expect(stream.toString()).toBe(msg1 + msg2);
  }
);

test(
  "Lê no stream",
  () => {
    const msg = "Olá, mundo!";
    const stream = new MemoryStream({data: [msg]});
    const data = stream.read().toString();
    expect(data).toBe(msg);
  }
);

test(
  "Lê no stream dois dados",
  () => {
    const msg1 = "Olá, mundo!";
    const msg2 = "A vida é bela!";
    const stream = new MemoryStream({data: [msg1, msg2]});
    const data = stream.read().toString();
    expect(data).toBe(msg1 + msg2);
  }
);

test(
  "Verifica o tamanho quando vazio",
  () => {
    const stream = new MemoryStream();
    expect(stream.size()).toBe(0);
  }
);

test(
  "Lê null quando tenta ler de um do vazio",
  () => {
    const stream = new MemoryStream();
    expect(stream.read()).toBe(null);
  }
);

test(
  "Verifica o quanto foi escrito na memória",
  () => {
    const msg1 = "Olá, mundo!";
    const msg2 = "A vida é bela!";
    const length = Buffer.from(msg1).length;
    const stream = new MemoryStream();
    stream.write(msg1);
    expect(stream.size()).toBe(length);
    stream.write(msg2);
    expect(stream.size()).toBe(length + Buffer.from(msg2).length);
  }
);

test(
  "Verifica o tamanho quando dados são passados no construtor",
  () => {
    const msg = "Olá, mundo!";
    const length = Buffer.from(msg).length;
    const stream = new MemoryStream({data: [msg]});
    expect(stream.size()).toBe(length);
  }
);

test(
  "Verifica se zera o tamanho após ler todo o conteúdo",
  () => {
    const msg = "Olá, mundo!";
    const length = Buffer.from(msg).length;
    const stream = new MemoryStream({data: [msg]});
    const data = stream.read();
    expect(stream.size()).toBe(0);
  }
);

test(
  "Verifica o tamanho após ler parcialmente o conteúdo",
  () => {
    const msg1 = "Olá, mundo!";
    const msg2 = "A vida é bela!";
    const length1 = Buffer.from(msg1).length;
    const length2 = Buffer.from(msg2).length;
    const stream = new MemoryStream({data: [msg1, msg2]});
    stream.read(length1);
    expect(stream.size()).toBe(length2);
  }
);
