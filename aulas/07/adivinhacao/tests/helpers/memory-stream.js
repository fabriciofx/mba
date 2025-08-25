import { Duplex } from "stream";

class FixedBuffer {
  #data;
  #offset;
  #extra;

  constructor(data = []) {
    this.#data = Buffer.concat(data.map(datum => Buffer.from(datum, "utf8")));
    this.#offset = 0;
    this.#extra = Buffer.alloc(0);
  }

  write(chunk, encoding, callback) {
    if (Buffer.isBuffer(chunk)) {
      this.#data = Buffer.concat([this.#data, chunk]);
    } else {
      this.#data = Buffer.concat(
        [
          this.#data,
          Buffer.from(chunk, encoding)
        ]
      );
    }
    callback();
  }

  read(size) {
    size = size ?? 65536;
    if (this.#extra.length >= size) {
      const chunk = this.#extra.subarray(0, size);
      this.#extra = this.#extra.subarray(size);
      return chunk;
    }
    const remainingSize = size - this.#extra.length;
    const remainingData = this.#data.length - this.#offset;
    if (remainingData <= 0 && this.#extra.length === 0) {
      return null;
    }
    const take = Math.min(remainingSize, remainingData);
    const chunk = Buffer.concat(
      [
        this.#extra,
        this.#data.subarray(this.#offset, this.#offset + take)
      ]
    );
    this.#offset += take;
    if (chunk.length > size) {
      this.#extra = chunk.subarray(size);
      return chunk.subarray(0, size);
    } else {
      this.#extra = Buffer.alloc(0);
    }
    return chunk;
  }

  size() {
    return this.#data.length - this.#offset;
  }

  content() {
    return this.#data;
  }

  toString(encoding = "utf8") {
    return this.content().toString(encoding);
  }
}

export class MemoryStream extends Duplex {
  #buffer;

  constructor({options, data = []} = {}) {
    super(options);
    this.#buffer = new FixedBuffer(data);
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
