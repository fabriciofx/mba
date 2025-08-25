import { Duplex } from "stream";

export class MemoryStream extends Duplex {
  #buffer;
  #offset;
  #extra;

  constructor({options, data = []} = {}) {
    // super({highWaterMark: 4});
    super(options);
    this.#buffer = Buffer.concat(data.map(datum => Buffer.from(datum, "utf8")));
    this.#offset = 0;
    this.#extra = Buffer.alloc(0);
  }

  _write(chunk, encoding, callback) {
    if (Buffer.isBuffer(chunk)) {
      this.#buffer = Buffer.concat([this.#buffer, chunk]);
    } else {
      this.#buffer = Buffer.concat(
        [this.#buffer, Buffer.from(chunk, encoding)]
      );
    }
    callback();
  }

  #readFromBuffer(size) {
    size = size ?? this.readableHighWaterMark;
    console.log("size: " + size);
    let chunk;

    // Se temos dados extras do último _read, use primeiro
    if (this.#extra.length >= size) {
      console.log("dados extras")
      chunk = this.#extra.subarray(0, size);
      this.#extra = this.#extra.subarray(size);
      // this.push(chunk);
      // return;
      return chunk;
    }

    // Combina os extras com novos dados
    const remainingSize = size - this.#extra.length;
    const remainingData = this.#buffer.length - this.#offset;
    console.log("remainingSize: " + remainingSize);
    console.log("remainingData: " + remainingData);

    if (remainingData <= 0 && this.#extra.length === 0) {
      console.log("fim do stream");
      // Sem dados sobrando, fim do stream
      // this.push(null);
      // return;
      this.push(null);
      return null;
    }

    // Pega o máximo que podemos da origem
    const toTake = Math.min(remainingSize, remainingData);
    console.log("toTake: " + toTake);
    console.log("buffer: " + this.#buffer.toString());
    const newChunk = this.#buffer.subarray(this.#offset, this.#offset + toTake);
    this.#offset += toTake;
    console.log("offset: " + this.#offset);

    // Combina com extras
    console.log("newChunk.length: " + newChunk.length);
    chunk = Buffer.concat([this.#extra, newChunk]);
    console.log("chunk: " + chunk.toString());
    console.log("chunk.length: " + chunk.length);

    // Se ainda passamos do tamanho pedido, guarda o extra
    if (chunk.length > size) {
      console.log("guarda o extra");
      this.#extra = chunk.subarray(size);
      chunk = chunk.subarray(0, size);
    } else {
      console.log("não guarda o extra");
      this.#extra = Buffer.alloc(0);
    }

    // this.push(chunk);
    console.log("retornando");
    return chunk;
  }


  _read(size) {
    this.push(this.#readFromBuffer(size));
    console.log("gravando");
  }

  read(size) {
    return this.#readFromBuffer(size);
  }

  size() {
    return this.#buffer.length - this.#offset;
  }

  content() {
    return this.#buffer;
  }

  toString(encoding = "utf8") {
    return this.content().toString(encoding);
  }
}
