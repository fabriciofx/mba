import { Adivinhacao, Console, Aleatorio } from "#src/index.js";

const jogo = new Adivinhacao(new Console(), new Aleatorio());
jogo.execute();
