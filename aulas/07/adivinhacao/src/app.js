import { Console } from "./console.js";
import { Aleatorio } from "./aleatorio.js";
import { Adivinhacao } from "./adivinhacao.js";

const jogo = new Adivinhacao(new Console(), new Aleatorio());
jogo.execute();
