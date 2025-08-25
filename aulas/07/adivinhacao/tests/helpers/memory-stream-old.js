import { Duplex } from "stream";

export class MemoryStream extends Duplex {
  #chunks;
  #size;
  #offset;

  constructor({options, data = []} = {}) {
    super({highWaterMark: 1});
    this.#chunks = data.map(datum => Buffer.from(datum, "utf8"));
    this.#size = this.#chunks.reduce(
      (sum, chunk) => sum = sum + chunk.length,
      0
    );
    this.#offset = 0;
  }

  _write(chunk, encoding, callback) {
    let buffer;
    if (Buffer.isBuffer(chunk)) {
      buffer = chunk;
    } else {
      buffer = Buffer.from(chunk, encoding);
    }
    this.#chunks.push(buffer);
    this.#size = this.#size + buffer.length;
    callback();
  }

  _read(size) {
    // console.log("size: " + size);
    const max = size ?? this.readableHighWaterMark;
    if (this.#size > 0) {
      console.log("size: " + size);
      console.log("max: " + max);
      console.log("this.#size1: " + this.#size);
      let length = 0;
      console.log("length1: " + length);
      while (this.#chunks.length > 0) {
        const chunk = this.#chunks.shift();
        console.log("chunk.length: " + chunk.length);
        console.log("length2: " + length);
        if (length + chunk.length > max) {
          console.log("parei de ler");
          break;
        }
        length = length + chunk.length;
        console.log("length3: " + length);
        console.log("chunk: " + chunk.toString());
        this.push(chunk);
        console.log("gravado");
      }
      console.log("this.#size2: " + this.#size);
      console.log("length4: " + length);
      this.#size = this.#size - length;
      console.log("this.#size3: " + this.#size);
      if (this.#chunks.length === 0) {
        console.log("push null");
        this.push(null);
      }
    } else {
      console.log("Aloca zero");
      this.push(Buffer.alloc(0));
    }
  }

  size() {
    return this.#size;
  }

  content() {
    return Buffer.concat(this.#chunks);
  }

  toString(encoding = "utf8") {
    return this.content().toString(encoding);
  }
}
