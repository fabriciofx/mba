import { MemoryStream } from "#helpers/index.js";
import { Adivinhacao, Console, Planejado } from "#src/index.js";

test(
  "Deve verificar a execução completa do jogo",
  () => {
    const msgs = [
      "Adivinhe um número entre 1 e 100: ",
      "Adivinhe um número entre 10 e 100: ",
      "Adivinhe um número entre 20 e 100: ",
      "Adivinhe um número entre 30 e 100: ",
      "Adivinhe um número entre 40 e 100: ",
      "Adivinhe um número entre 50 e 100: ",
      "Adivinhe um número entre 51 e 100: ",
      "Adivinhe um número entre 52 e 100: ",
      "Adivinhe um número entre 53 e 100: ",
      "Adivinhe um número entre 54 e 100: ",
      "Suas tentativas acabaram! O número secreto era 59!\n"
    ].join("");
    const output = new MemoryStream();
    const input = new MemoryStream(
      {
        data: [
          "10\n", "20\n", "30\n", "40\n", "50\n", "51\n", "52\n", "53\n",
          "54\n", "55\n"
        ]
      }
    );
    const consol = new Console({input: input, output: output});
    const adivinhacao = new Adivinhacao(
      consol,
      new Planejado(1, 100, 60, 59)
    );
    adivinhacao.execute();
    expect(output.toString()).toBe(msgs);
  }
);
