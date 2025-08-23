import rls from "readline-sync";

export class ConsolePadrao {
  constructor() {
  }

  escreve(msg) {
    process.stdout.write(msg);
  }

  le() {
    return rls.question('');
  }
}
