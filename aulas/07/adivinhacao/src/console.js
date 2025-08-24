import fs from "fs";
import { stdin } from 'process';
import { Readable } from 'stream';

export class Console {
  #input;
  #output;

  constructor({input = process.stdin, output = process.stdout} = {}) {
    this.#output = output;
    this.#input = input;
  }

  #isStdin(stream) {
    let check = false;
    if (!(stream instanceof Readable)) {
      check = false;
    } else if (stream === stdin) {
      check = true;
    } else if (typeof stream.fd === 'number' && stream.fd === 0) {
      check = true;
    }
    return check;
  }

  mostre(msg) {
    this.#output.write(msg);
  }

  leia() {
    let dados = "";
    if (this.#isStdin(this.#input)) {
      const raw = this.#input.isRaw;
      this.#input.setRawMode(true);
      const buffer = Buffer.alloc(1);
      while (true) {
        let read = 0;
        try {
          read = fs.readSync(this.#input.fd, buffer, 0, 1, null);
        } catch (err) {
          if (err.code === 'EAGAIN') {
            continue;
          }
          throw err;
        }
        if (read === 0) {
          continue;
        }
        const chr = buffer.toString("utf8");
        if (chr === "\r" || chr === "\n") {
          break;
        } else {
          dados = dados + chr;
          this.#output.write(chr);
        }
      }
      this.#input.setRawMode(raw);
      this.#output.write("\r\n");
    } else {
      this.#input.read
    }
    return dados;
  }
}
