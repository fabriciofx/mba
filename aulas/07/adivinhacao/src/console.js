import fs from "fs";
import { Stream } from "stream";

class HasFd {
  #stream;

  constructor(stream) {
    this.#stream = stream;
    Object.freeze(this);
  }

  value() {
    return this.#stream instanceof Stream &&
      "fd" in this.#stream &&
      typeof this.#stream.fd === "number"
  }
}

class ByteByByte {
  #stream;
  #buffer;

  constructor(stream, buffer = []) {
    this.#stream = stream;
    this.#buffer = buffer;
    Object.freeze(this);
  }

  read() {
    while (true) {
      const byte = this.#stream.read(1);
      if (byte.length == 0 || byte == "\n" || byte == "\r") {
        break;
      }
      this.#buffer.push(byte);
    }
    return Buffer.concat(this.#buffer);
  }

  toString(enconding = "utf8") {
    return this.read().toString(enconding);
  }
}

class BlockOfBytes {
  #buffer;
  #stream;
  #size;
  #bytes;

  constructor(stream, size = 1024) {
    this.#buffer = Buffer.alloc(size);
    this.#stream = stream;
    this.#size = size;
    this.#bytes = 0;
  }

  read() {
      while (true) {
        try {
          this.#bytes = fs.readSync(
            this.#stream.fd,
            this.#buffer,
            0,
            this.#size,
            null
          );
        } catch (err) {
          if (err.code === "EAGAIN") {
            continue;
          }
          throw err;
        }
        break;
      }
    return this.#buffer;
  }

  toString(enconding = "utf8") {
    return this.read().toString(
      enconding,
      0,
      this.#bytes
    ).replace(/[\r\n]+$/, "");
  }
}

export class Console {
  #input;
  #output;

  constructor({input = process.stdin, output = process.stdout} = {}) {
    this.#input = input;
    this.#output = output;
    Object.freeze(this);
  }

  mostre(msg) {
    this.#output.write(msg);
  }

  leia() {
    let data;
    if (new HasFd(this.#input).value()) {
      data = new BlockOfBytes(this.#input).toString();
    } else {
      data = new ByteByByte(this.#input).toString();
    }
    return data;
  }
}
