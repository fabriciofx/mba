import rls from "readline-sync";

export class Console {
  constructor() {
  }

  escreve(msg) {
    process.stdout.write(msg);
  }

  le() {
    return rls.question('');
  }
}
