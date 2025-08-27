import { Duplex } from "stream";
import { once } from "#src/index.js";

class MemoryArea {
  #area;
  #offset;

  constructor(data = []) {
    this.#area = once(
      () => [Buffer.concat(data.map(datum => Buffer.from(datum)))]
    );
    this.#offset = [0];
    Object.freeze(this);
  }

  write(chunk, encoding, callback) {
    let tmp;
    if (Buffer.isBuffer(chunk)) {
      tmp = chunk;
    } else {
      tmp = Buffer.from(chunk, encoding);
    }
    const area = this.#area().shift();
    this.#area().push(Buffer.concat([area, tmp]));
    callback();
  }

  read(size) {
    const offset = this.#offset.shift();
    const area = this.#area().at(0);
    const length = typeof size !== "undefined" ? offset + size : 65536;
    const chunk = area.subarray(offset, length);
    this.#offset.push(offset + chunk.length);
    return chunk;
  }

  size() {
    const area = this.#area().at(0);
    const offset = this.#offset.at(0);
    return area.length - offset;
  }

  content() {
    const area = this.#area().at(0);
    return area;
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
