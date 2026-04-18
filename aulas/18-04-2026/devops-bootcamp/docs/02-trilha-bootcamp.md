# Trilha sugerida (8 encontros / 1 sprint por encontro)

> Ajuste a carga horária conforme sua turma. Cada encontro termina com um “incremento” verificável no repositório.

## Encontro 1 — Setup + Cultura + Base do projeto
- Contrato de trabalho: branching, PR, definição de pronto, critérios de qualidade
- Rodar o `todo-api` localmente e entender endpoints de saúde
- Entrega: repo inicial + README + backlog do produto

## Encontro 2 — Docker (build, run, compose)
- Dockerfile, camadas, boas práticas, variáveis de ambiente, volumes
- `docker compose` para subir API + PostgreSQL
- Entrega: imagem versionada + compose para dev

## Encontro 3 — Registry e release
- Tags e versionamento (ex.: `1.2.3`, `sha`, `pr-123`)
- Registry local (para labs) e estratégia para registry cloud (opcional)
- Entrega: build/push de imagem em registry local

## Encontro 4 — Kubernetes (fundamentos)
- `kind` (cluster local), namespaces, deployments, services
- Probes (liveness/readiness) e rollout
- Entrega: manifests em `k8s/` e deploy funcional

## Encontro 5 — Kubernetes (operações)
- Requests/limits, autoscaling (HPA opcional), configmaps/secrets
- Estratégias de atualização e rollback
- Entrega: parâmetros de operação e “runbook” simples

## Encontro 6 — Jenkins (CI)
- Jenkins Pipeline as Code (Declarative), agentes, artefatos
- Qualidade: lint/test + build de imagem
- Entrega: `ci/jenkins/Jenkinsfile` executando build/test

## Encontro 7 — Jenkins (CD)
- Push da imagem e deploy no cluster
- Aprovação manual (stage) e promoção de ambiente
- Entrega: pipeline com deploy e verificação de rollout

## Encontro 8 — Terraform (IaC) e integração (cloud opcional)
- Terraform para provisionar Kubernetes gerenciado (ex.: EKS)
- Estado remoto, variáveis, outputs, organização por módulos
- Entrega: `infra/terraform/` + pipeline capaz de apontar para cluster cloud

## Encerramento (capstone)
- Demo (release) + incident drill (simular falha e rollback)
- Post-mortem: o que melhorou fluxo e confiabilidade?
