import { Console } from "#src/console.js";
import { Aleatorio } from "#src/contexto.js";
import { Adivinhacao } from "#src/adivinhacao.js";

const jogo = new Adivinhacao(new Console(), new Aleatorio());
jogo.execute();
