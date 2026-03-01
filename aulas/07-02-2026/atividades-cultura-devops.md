# Cultura DevOps

## Atividade: transformar uma feature em entrega segura
- Escolha uma feature simples (ex: cadastro de usuário / pagamento / webhook).
- Defina critérios de aceitação + 1 métrica de sucesso (SLI).
- Liste riscos técnicos (deploy, dados, segurança, performance).
- Proponha 1 estratégia de rollout (canary, blue/green, feature flag).

Entrega esperada: Uma mini-especificação (1 slide/1 página) com SLI e plano de release


## Atividade: desenhar uma estratégia de testes por risco
- Escolha um sistema (monólito, microserviço, API).
- Liste 3 riscos (ex: pagamentos duplicados, vazamento, indisponibilidade).
- Associe cada risco a testes (unit/integration/e2e/perf/sec).
- Defina o que deve ser "bloqueador" no pipeline.

Entrega esperada: Uma matriz risco → testes → gate no CI


## Atividade: montar um pipeline mínimo "prod-ready"
- Defina as etapas do pipeline (build → test → scan → package → deploy).
- Marque o que é obrigatório (gate) e o que é sinal (report).
- Escolha uma estratégia de deploy (canary/blue-green/rolling).
- Desenhe o rollback e o critério de "abort" do rollout.

Entrega esperada: Um diagrama do pipeline + critérios de gate/rollback


## Atividade: desenhar observabilidade para uma API crítica
- Escolha uma rota crítica (ex: POST /payments).
- Defina 2 SLIs (latência e erro) e 1 SLO.
- Liste logs essenciais (ids, traceId, status, tempo, erro).
- Defina 2 alertas acionáveis + 1 dashboard mínimo.

Entrega esperada: SLIs/SLOs + alertas + dashboard mínimo


## Atividade final: plano DevOps para um time real
- Escolha um cenário (ex: fintech com API de pagamentos).
- Descreva "antes" (dores e gargalos) e defina 2 objetivos.
- Escolha 3 iniciativas (CI, CD, observabilidade, segurança, plataforma).
- Defina métricas de sucesso (DORA + 1 métrica de produto).
- Monte um roadmap de 30/60/90 dias.

Entrega esperada: Roadmap 30/60/90 com métricas e trade-offs
