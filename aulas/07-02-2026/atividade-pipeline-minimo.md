# Cultura DevOps

## Atividade: montar um pipeline mínimo "prod-ready"
- Defina as etapas do pipeline (build → test → scan → package → deploy).
- Marque o que é obrigatório (gate) e o que é sinal (report).
- Escolha uma estratégia de deploy (canary/blue-green/rolling).
- Desenhe o rollback e o critério de "abort" do rollout.

### Pipeline mínimo "prod-ready"

#### Etapas

1. Build
   - Compilação: gate
   - Resolução de dependências: gate
   - Warnings: report
   - Lint não crítico: report
2. Testes
   - Teste falhou: gate
   - Fluxo crítico falhou: gate
   - Cobertura mínima não atingida: gate
   - Teste ignorado: report
3. Security scan
   - CVE crítico: gate
   - CVE alto: gate
   - Vulnerabilidade crítica: gate
   - CVE médio ou baixo: report
   - Code smell de segurança: report
4. Package
   - Falha o gerar o aterfato: gate
   - Warning de build do Docker: report
5. Deploy em homologação
   - Smoke test falhou: gate
   - Health check falhou: gate
   - Pequena degradação de performance: report
6. Deploy em produção
   - Taxa de erro acima do limite: gate (com rollback)
   - Latência ou alguma métrica acima do SLO: gate (com rollback)
   - Aumento leve de utilização da CPU: report

#### Estratégia de deploy

A estratégia de deploy utilizada será a Canary Release.

#### Diagrama do pipeline

@startuml pipeline

scale 0.65
hide empty description

state "Security Scan" as SecurityScan
state "Deploy\nHomologação" as DeployHomologacao
state "Smoke\nTestes" as SmokeTestes
state "Deploy\nProdução\n(5% tráfego)" as DeployProducao5
state "Deploy\nProdução\n(10% tráfego)" as DeployProducao10
state "Deploy\nProdução\n(25% tráfego)" as DeployProducao25
state "Deploy\nProdução\n(50% tráfego)" as DeployProducao50
state "Deploy\nProdução\n(100% tráfego)" as DeployProducao100

[*] --> Build
Build --> Testes : ok
Build --> Abort : falhou
Testes --> SecurityScan : ok
Testes --> Abort : falhou
SecurityScan --> Package : ok
SecurityScan --> Abort : falhou
Package --> DeployHomologacao : ok
Package --> Abort : falhou
DeployHomologacao --> SmokeTestes : ok
DeployHomologacao --> Abort : falhou
SmokeTestes --> DeployProducao5: ok
SmokeTestes --> Abort : falhou
DeployProducao5 --> DeployProducao10 : ok
DeployProducao5 --> Rollback: falhou
DeployProducao10 --> DeployProducao25 : ok
DeployProducao10 --> Rollback: falhou
DeployProducao25 --> DeployProducao50 : ok
DeployProducao25 --> Rollback: falhou
DeployProducao50 --> DeployProducao100 : ok
DeployProducao50 --> Rollback: falhou
DeployProducao100 --> [*]
DeployProducao100 --> Rollback: falhou

@enduml
