import { Writable } from "stream";

export class MemoryStream extends Writable {
  #chunks;

  constructor({options, data = []} = {}) {
    super(options);
    this.#chunks = data.map(datum => Buffer.from(datum, "utf8"));
  }

  _write(chunk, encoding, callback) {
    let buffer;
    if (Buffer.isBuffer(chunk)) {
      buffer = chunk;
    } else {
      buffer = Buffer.from(chunk, encoding);
    }
    this.#chunks.push(buffer);
    callback();
  }

  toString(encoding = "utf8") {
    return Buffer.concat(this.#chunks).toString(encoding);
  }
}
