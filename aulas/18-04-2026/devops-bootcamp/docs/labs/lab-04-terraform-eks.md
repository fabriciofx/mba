# Lab 04 — Terraform (AWS EKS) — opcional/cloud

## Objetivo
Provisionar um cluster Kubernetes gerenciado com Terraform e reutilizar o mesmo deploy/pipeline.

## Requisitos
- Conta AWS (idealmente sandbox)
- AWS CLI configurado
- Terraform instalado

## Passos (alto nível)
1) Provisionar EKS:
```powershell
cd devops-bootcamp\infra\terraform\aws-eks
terraform init
terraform apply
```
2) Conectar `kubectl` ao cluster (via AWS CLI):
```powershell
aws eks update-kubeconfig --region <REGIAO> --name <NOME_DO_CLUSTER>
kubectl get nodes
```
3) Deploy (reusar `k8s/`):
```powershell
cd ..\..\..\..
kubectl apply -f .\k8s
```

## Entrega
- Terraform com variáveis e outputs.
- Documentar custo e estratégia de teardown (`terraform destroy`).
