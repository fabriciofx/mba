import fs from "fs";
import { Stream } from "stream";

export class Console {
  #input;
  #output;

  constructor({input = process.stdin, output = process.stdout} = {}) {
    this.#output = output;
    this.#input = input;
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
          if (err.code === 'EAGAIN') {
            continue;
          }
          throw err;
        }
        break;
      }
    } else {
      this.#input.setEncoding("utf8");
      data = this.#input.read(size).toString();
    }
    return data;
  }
}
