import { Duplex } from "stream";

class MemoryArea {
  #area;
  #offset;

  constructor(data = []) {
    this.#area = Buffer.concat(data.map(datum => Buffer.from(datum)));
    this.#offset = [0];
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
    const off = this.#offset.shift();
    const length = typeof size !== "undefined" ? off + size : 65536;
    const chunk = this.#area.subarray(off, length);
    this.#offset.push(off + chunk.length);
    return chunk;
  }

  size() {
    return this.#area.length - this.#offset.at(0);
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
