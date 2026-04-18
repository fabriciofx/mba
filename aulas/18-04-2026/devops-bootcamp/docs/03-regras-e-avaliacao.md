# Regras do projeto (para simular “empresa”)

## Fluxo de trabalho
- Todo trabalho entra via issue/tarefa e vira PR.
- PR só pode ser mergeado com pipeline verde.
- Mudanças de infra (Terraform/K8s) precisam de revisão (mín. 1 aprovador).
- Releases são rastreáveis (tag ou `GIT_SHA`) e com changelog simples.

## Qualidade mínima (Definition of Done)
- Endpoints de saúde funcionando (`/live` e `/ready`).
- Logs úteis (início, porta, falhas de dependência).
- Manifests K8s com probes e requests/limits.
- Pipeline Jenkins com etapas claras e falha rápida.

## Critérios de avaliação (exemplo)
- 40% CI/CD (Jenkins): build/test, versionamento, deploy, rollback/rollout
- 30% Kubernetes: manifests, operação, troubleshooting básico, runbook
- 20% Terraform: provisioning reprodutível, variáveis, outputs, organização
- 10% Documentação: README e instruções de execução
