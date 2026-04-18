# Visão geral (cultura DevOps aplicada)

## Objetivo do módulo
Demonstrar como a cultura DevOps aparece no dia a dia de um time de produto e como ela se materializa em processos e automações: entrega contínua, confiabilidade, observabilidade, segurança e governança.

## Princípios (referência rápida)
- **Colaboração**: times multifuncionais, responsabilidade compartilhada por qualidade e operação.
- **Automação**: CI/CD, provisionamento, testes, validações e deploy repetíveis.
- **Medição**: métricas de fluxo (ex.: DORA), SLO/SLI, custo, incidentes.
- **Aprendizado**: post-mortems sem culpa, melhoria contínua, redução de toil.

## O que o projeto simula
- Um serviço real (API) com dependência (PostgreSQL).
- Ambientes (dev/stage/prod) representados por *namespaces* ou clusters.
- “Esteira” de entrega: build + testes + imagem + deploy + verificação + rollback.
- Infra como código (Terraform) para reproduzir e auditar ambientes.

## Resultados esperados do aluno
- Rodar e depurar a aplicação em containers.
- Publicar imagens em registry (local e/ou cloud).
- Entender e operar workloads no Kubernetes (Deployments, Services, Ingress, probes).
- Criar pipelines Jenkins com boas práticas (credenciais, etapas, artefatos, aprovações).
- Provisionar cluster Kubernetes em cloud com Terraform e conectar CI/CD.
