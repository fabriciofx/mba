import { MemoryStream } from "#helpers/index.js";

test(
  "Deve escrever no stream uma frase",
  () => {
    const msg = "Olá, mundo!";
    const stream = new MemoryStream();
    stream.write(msg);
    expect(stream.toString()).toBe(msg);
  }
);

test(
  "Deve escrever no stream duas vezes seguidas",
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
  "Deve ler do stream uma frase",
  () => {
    const msg = "Olá, mundo!";
    const stream = new MemoryStream({data: [msg]});
    const data = stream.read().toString();
    expect(data).toBe(msg);
  }
);

test(
  "Deve ler do stream duas frases seguidas",
  () => {
    const msg1 = "Olá, mundo!";
    const msg2 = "A vida é bela!";
    const stream = new MemoryStream({data: [msg1, msg2]});
    const length = Buffer.from(msg1).length + Buffer.from(msg2).length;
    const data = stream.read(length).toString();
    expect(data).toBe(msg1 + msg2);
  }
);

test(
  "Deve retornar zero para o tamanho de um stream vazio",
  () => {
    const stream = new MemoryStream();
    expect(stream.size()).toBe(0);
  }
);

test(
  "Deve retornar um buffer vazio ao tentar ler de um stream vazio",
  () => {
    const stream = new MemoryStream();
    expect(stream.read().length).toBe(0);
  }
);

test(
  "Deve retornar o tamanho em bytes das mensagens escritas",
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
  "Deve verificar o tamanho da stream quando dados são passados no construtor",
  () => {
    const msg = "Olá, mundo!";
    const length = Buffer.from(msg).length;
    const stream = new MemoryStream({data: [msg]});
    expect(stream.size()).toBe(length);
  }
);

test(
  "Deve retornar tamanho zero após ler todo o conteúdo",
  () => {
    const msg = "Olá, mundo!";
    const length = Buffer.from(msg).length;
    const stream = new MemoryStream({data: [msg]});
    const data = stream.read();
    expect(stream.size()).toBe(0);
  }
);

test(
  "Deve retornar o tamanho dos dados remanescentes",
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

test(
  "Deve ler parcialmente a primeira metade do conteúdo",
  () => {
    const msg = "Olá, mundo!";
    const stream = new MemoryStream({data: [msg]});
    expect(stream.read(4).toString()).toBe("Olá");
  }
);

test(
  "Deve ler parcialmente a segunda metade do conteúdo",
  () => {
    const msg = "Olá, mundo!";
    const stream = new MemoryStream({data: [msg]});
    stream.read(4);
    expect(stream.read().toString()).toBe(", mundo!");
  }
);
