import fs from "fs";
import { Stream } from "stream";

class ByteByByte {
  #stream;
  #buffer;

  constructor(stream, buffer = []) {
    this.#stream = stream;
    this.#buffer = buffer;
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

export class Console {
  #input;
  #output;

  constructor({input = process.stdin, output = process.stdout} = {}) {
    this.#input = input;
    this.#output = output;
  }

  mostre(msg) {
    this.#output.write(msg);
  }

  leia() {
    let data = "";
    const size = 1024;
    if (this.#input instanceof Stream &&
      "fd" in this.#input &&
      typeof this.#input.fd === "number"
    ) {
      const buffer = Buffer.alloc(size);
      while (true) {
        try {
          const read = fs.readSync(this.#input.fd, buffer, 0, size, null);
          data = buffer.toString("utf8", 0, read).replace(/[\r\n]+$/, "");
        } catch (err) {
          if (err.code === "EAGAIN") {
            continue;
          }
          throw err;
        }
        break;
      }
    } else {
      data = new ByteByByte(this.#input).toString();
    }
    return data;
  }
}
