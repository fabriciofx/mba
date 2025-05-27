# Design e Arquitetura I - 24/05/2025

## Inversão de Controle (IoC)

Você está com sede. O que você faz?

- Maneira tradicional (sem IoC):

Você vai até a geladeira, pega o copo, abre a garrafa e se serve.
Você controla tudo. Você decide o que fazer e faz.

- Com Inversão de Controle (IoC):

Você senta à mesa, e alguém te traz um copo com suco.

Agora você não faz nada além de beber.
Você não tem controle sobre como o suco foi feito ou servido.
Você só recebe o que precisa.

> Isso é IoC: Você não controla o processo interno, alguém de fora cuida disso
> pra você.

**Exemplo:**

- Sem Inversão de Controle:

```java
class App {
    void iniciar() {
        ServicoEmail servico = new ServicoEmail();
        servico.enviar("Olá!");
    }
}
```

A classe App cria tudo o que precisa.
Ela **tem o controle** — ela **decide** qual ServicoEmail usar e quando criar.

- Com Inversão de Controle:

```java
class App {
    private ServicoEmail servico;

    public App(ServicoEmail servico) {
        this.servico = servico; // alguém entrega o que ela precisa
    }

    void iniciar() {
        servico.enviar("Olá!");
    }
}
```

Agora, **App não cria mais o ServicoEmail**.
Ela só **usa**.
**Quem entrega o serviço é alguém de fora** — o código externo decide.

- Resumo:

| Sem IoC                   | Com IoC (Inversão de Controle)      |
| ------------------------- | ----------------------------------- |
| Você cria e controla tudo | Você **recebe** o que precisa       |
| Você chama os objetos     | Os objetos **são entregues a você** |
| Alta dependência interna  | Menor acoplamento (mais flexível)   |
