import { MemoryStream } from "../helpers/memory-stream.js";

test(
  "Escreve no stream",
  () => {
    const msg = "Olá, mundo!";
    const stream = new MemoryStream({data: [msg]});
    expect(stream.toString()).toBe(msg);
  }
);
