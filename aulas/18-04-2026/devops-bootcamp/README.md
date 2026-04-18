# DevOps Bootcamp — Projeto Prático (Docker + Kubernetes + Jenkins + Terraform)

Este repositório foi desenhado para um módulo de DevOps em pós-graduação: a turma evolui um projeto “de ponta a ponta”, praticando cultura e ferramentas (CI/CD, IaC, containers, Kubernetes) com foco no que é comum em empresas.

## O que a turma entrega ao final
- Uma API simples containerizada com Docker.
- Deploy e operação básica em Kubernetes (cluster local com `kind`).
- Pipeline Jenkins “Pipeline as Code” (build/test, build/push de imagem, deploy no cluster).
- Infraestrutura como código com Terraform (trilha local + trilha cloud com AWS EKS).

## Estrutura do repositório
- `services/todo-api/` — aplicação exemplo (Node.js) + Dockerfile + testes
- `k8s/` — manifests Kubernetes (Namespace, Deployment, Service, Ingress, HPA opcional)
- `ci/jenkins/` — Jenkinsfile e runtime local (Docker Compose)
- `infra/kind/` — configuração do cluster local com kind + registry local
- `infra/terraform/` — exemplos de Terraform (EKS e base)
- `docs/` — trilha do bootcamp e labs
- `scripts/` — automações para bootstrap local

## Pré‑requisitos (sugestão)
- Git
- Docker Desktop (ou Docker Engine)
- `kubectl`
- `kind`
- Terraform `>= 1.6`
- (Opcional cloud) AWS CLI + credenciais de conta (idealmente sandbox/educacional)

## Quickstart (100% local)
1) Suba a aplicação localmente (Docker Compose):
```powershell
cd devops-bootcamp
docker compose up --build
```
2) Crie cluster Kubernetes local (kind) + registry local:
```powershell
.\scripts\bootstrap-local.ps1
kubectl get nodes
```
3) Build + push da imagem (registry local):
```powershell
docker build -t localhost:5000/todo-api:dev .\services\todo-api
docker push localhost:5000/todo-api:dev
```
4) Deploy no Kubernetes:
```powershell
kubectl apply -f .\k8s
kubectl -n todo rollout status deploy/todo-api
kubectl -n todo port-forward svc/todo-api 3000:80
```
Opcional (Ingress/HPA):
```powershell
kubectl apply -f .\k8s\optional
```
5) Suba o Jenkins local (com Docker-in-Docker para builds):
```powershell
docker compose -f .\ci\jenkins\docker-compose.yml up -d --build
```
Depois, crie um “Pipeline job” apontando para este repositório e use `ci/jenkins/Jenkinsfile`.

## Bootcamp
Veja `docs/02-trilha-bootcamp.md:1` e siga os labs em `docs/labs/:1`.
