import { Duplex } from "stream";

class MemoryArea {
  #area;
  #offset;

  constructor(data = []) {
    this.#area = Buffer.concat(data.map(datum => Buffer.from(datum)));
    this.#offset = 0;
  }

  write(chunk, encoding, callback) {
    let tmp;
    if (Buffer.isBuffer(chunk)) {
      tmp = chunk;
    } else {
      tmp = Buffer.from(chunk, encoding);
    }
    this.#area = Buffer.concat([this.#area, tmp]);
    callback();
  }

  read(size) {
    const length = typeof size !== "undefined" ? this.#offset + size : 65536;
    const chunk = this.#area.subarray(this.#offset, length);
    this.#offset = this.#offset + chunk.length;
    return chunk;
  }

  size() {
    return this.#area.length - this.#offset;
  }

  content() {
    return this.#area;
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
