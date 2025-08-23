import rls from "readline-sync";

export class Console {
  constructor() {
  }

  mostre(msg) {
    process.stdout.write(msg);
  }

  leia() {
    return rls.question('');
  }
}
