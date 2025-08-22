import { ConsolePadrao } from "./console.js";
import { Numero } from "./aleatorio.js";
import { Adivinhacao } from "./adivinhacao.js";

const jogo = new Adivinhacao(new ConsolePadrao(), new Numero());
jogo.execute();
