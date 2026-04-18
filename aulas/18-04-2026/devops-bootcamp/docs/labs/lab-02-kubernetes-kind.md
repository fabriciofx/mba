# Lab 02 — Kubernetes (kind)

## Objetivo
Criar cluster local e fazer deploy da aplicação via manifests Kubernetes.

## Passos
1) Criar cluster + registry:
```powershell
cd devops-bootcamp
.\scripts\bootstrap-local.ps1
kubectl get nodes
```
2) Publicar imagem no registry local:
```powershell
docker build -t localhost:5000/todo-api:dev .\services\todo-api
docker push localhost:5000/todo-api:dev
```
3) Aplicar manifests:
```powershell
kubectl apply -f .\k8s
kubectl -n todo set image deploy/todo-api todo-api=localhost:5000/todo-api:dev
kubectl -n todo rollout status deploy/todo-api
```
4) (Opcional) Ingress e HPA:
```powershell
kubectl apply -f .\k8s\optional
```
5) Acessar via port-forward:
```powershell
kubectl -n todo port-forward svc/todo-api 3000:80
```

## Entrega
- `k8s/` com Deployment/Service/Config/Secret e probes.
- Pequeno runbook: como verificar logs, events e rollout.
