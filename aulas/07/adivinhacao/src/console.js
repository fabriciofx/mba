import rls from "readline-sync";

// Interface
class Console {
  escreve(msg) { throw new Error("Método 'escreve' precisa ser implementado"); }
  le() { throw new Error("Método 'le' precisa ser implementado"); }
}

export class ConsolePadrao extends Console {
  constructor() {
    super();
  }

  escreve(msg) {
    process.stdout.write(msg);
  }

  le() {
    return rls.question('');
  }
}
