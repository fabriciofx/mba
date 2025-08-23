import { ConsolePadrao } from "./console.js";
import { IntAleatorio } from "./aleatorio.js";
import { Adivinhacao } from "./adivinhacao.js";

const jogo = new Adivinhacao(new ConsolePadrao(), new IntAleatorio());
jogo.execute();
