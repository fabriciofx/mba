import { Despedida } from "#src/despedida.js";

test(
  "Deve mostrar a mensagem 'Parabéns! Você acertou o número!'",
  () => {
    const tentativas = {
      avalia: () => true
    };
    const despedida = new Despedida(tentativas);
    expect(despedida.mensagem()).toBe("Parabéns! Você acertou o número!\n");
  }
);

test(
  "Deve mostrar a mensagem 'Suas tentativas acabaram! O número secreto era 42!'",
  () => {
    const tentativas = {
      avalia: () => false,
      secreto: () => 42
    };
    const despedida = new Despedida(tentativas);
    expect(despedida.mensagem()).toBe(
      "Suas tentativas acabaram! O número secreto era 42!\n"
    );
  }
);
