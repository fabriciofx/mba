# AWS EKS (Terraform)

## Pré-requisitos
- Terraform `>= 1.6`
- AWS CLI configurado com credenciais válidas

## Como usar
```powershell
cd devops-bootcamp\infra\terraform\aws-eks
terraform init
terraform apply
```

Após criar, conecte seu `kubectl`:
```powershell
aws eks update-kubeconfig --region <REGIAO> --name <NOME_DO_CLUSTER>
kubectl get nodes
```

## Teardown
```powershell
terraform destroy
```

## Observação de custos
EKS, NAT Gateway e nodes geram custo. Use conta sandbox e destrua ao final do lab.
