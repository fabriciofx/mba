import { Duplex } from "stream";
import { Value, Cached } from "#src/index.js";

class MemoryArea {
  #memory;
  #offset;

  constructor(data = []) {
    this.#memory = new Cached(
      () => Buffer.concat(data.map(datum => Buffer.from(datum)))
    );
    this.#offset = new Value(0);
    Object.freeze(this);
  }

  write(chunk, encoding, callback) {
    let tmp;
    if (Buffer.isBuffer(chunk)) {
      tmp = chunk;
    } else {
      tmp = Buffer.from(chunk, encoding);
    }
    const buffer = this.#memory.read();
    this.#memory.write(Buffer.concat([buffer, tmp]));
    callback();
  }

  read(size) {
    const offset = this.#offset.read();
    const buffer = this.#memory.read();
    const length = typeof size !== "undefined" ? offset + size : 65536;
    const chunk = buffer.subarray(offset, length);
    this.#offset.write(offset + chunk.length);
    return chunk;
  }

  size() {
    const buffer = this.#memory.read();
    const offset = this.#offset.read();
    return buffer.length - offset;
  }

  content() {
    return this.#memory.read();
  }

  toString(encoding = "utf8") {
    return this.content().toString(encoding);
  }
}

export class MemoryStream extends Duplex {
  #buffer;

  constructor({options, data = []} = {}) {
    super(options);
    this.#buffer = new MemoryArea(data);
  }

  _write(chunk, encoding, callback) {
    this.#buffer.write(chunk, encoding, callback);
  }

  _read(size) {
    this.push(this.#buffer.read(size));
  }

  read(size) {
    return this.#buffer.read(size);
  }

  size() {
    return this.#buffer.size();
  }

  content() {
    return this.#buffer.content()
  }

  toString(encoding = "utf8") {
    return this.#buffer.toString(encoding);
  }
}
