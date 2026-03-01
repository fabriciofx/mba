# Cultura DevOps

## Atividade: desenhar uma estratégia de testes por risco
- Escolha um sistema (monólito, microserviço, API).
- Liste 3 riscos (ex: pagamentos duplicados, vazamento, indisponibilidade).
- Associe cada risco a testes (unit/integration/e2e/perf/sec).
- Defina o que deve ser "bloqueador" no pipeline.

### Sistema escolhido: microserviço

#### Riscos

1. Comunicação instável entre serviços
2. Inconsistência de dados distribuídos
3. Complexidade operacional

#### Testes

1. Comunicação instável entre serviços
   - Testes de unidade: retry, fallback e simular exceções.
   - Teste de integração: subir dois ou mais serviços e simular a indisponibilidade em um deles.
   - Testes e2e: verificar o fluxo completo e forçar a falha em um serviço e observar o impacto.
   - Testes de performance: comportamento sob alta latência ou alta carga.
   - Testes de segurança: autenticação entre serviços, expiração do token ou falha de autorização.
2. Inconsistência de dados distribuídos
   - Testes de unidade: compensação da saga, idempotência e tratamento de eventos duplicados.
   - Testes de integração: fluxo de evento entre serviços, publicação e consumo da mensagem e rollback parcial.
   - Testes e2e: fluxo completo de negócio.
   - Testes de performance: aumentar a taxa de eventos simultâneos e fila congestionada.
   - Testes de segurança: garantir que o evento não pode ser forjado e a integridade da mensagem.
3. Complexidade operacional
   - Testes de unidade: validar a configuração de propriedades e parsing de configurações.
   - Testes de integração: testar contratos de API e compatibilidade entre versões.
   - Testes e2e: validar fluxo completo após o deploy
   - Testes de performance: escalabilidade horizontal e múltiplas instâncias
   - Testes de segurança: autenticação centralizada, autorização cross-service e isolamento entre serviços

#### Bloqueador no pipeline

Se não passar em algum teste que não seja uma queda de performance não crítica, não deve ir para deploy.

#### Matriz de riscos x testes

| Risco | Teste | Gate no CI |
|-------|-------|------------|
| Comunicação instável entre serviços | Unidade, Integração, E2E ou Segurança | Bloqueia se falhar em algum teste |
| Inconsistência de dados distribuídos | Unidade, Integração, E2E ou Segurança | Bloqueia se falhar em algum teste |
| Complexidade operacional | Unidade, Integração, E2E ou Segurança | Bloqueia se falhar em algum teste |
