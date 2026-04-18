# Comparação: EKS vs EC2 WordPress

## 🎯 Objetivo

Ambos os projetos utilizam a **mesma estrutura de autenticação e credenciais AWS**, mas para diferentes tipos de infraestrutura:

- **EKS**: Kubernetes gerenciado (orquestração de containers)
- **EC2 WordPress**: Máquina virtual com WordPress pré-configurado

## 🔐 Estrutura de Credenciais - IDÊNTICA

### Arquivo: `providers.tf`

```hcl
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project = "devops-bootcamp"
      Owner   = "pos-graduacao"
    }
  }
}
```

**Ambos os projetos usam:**
- Mesma autenticação AWS (credenciais do ambiente)
- Mesma região (variável `aws_region`)
- Mesmas tags padrão para rastreamento

## 📋 Estrutura de Arquivos

```
Estrutura Comum:
├── providers.tf      ← IDÊNTICO
├── variables.tf      ← Similar, mas variáveis diferentes
├── terraform.tfvars  ← Valores diferentes para cada projeto
├── outputs.tf        ← Outputs específicos
├── versions.tf       ← Idêntico (Terraform >= 1.0)
├── .gitignore        ← Idêntico
└── README.md         ← Específico do projeto
```

## 🔄 Comparação de Variáveis

| Categoria | EKS | EC2 WordPress |
|-----------|-----|---------------|
| **Autenticação** | Mesma (AWS credentials) | ✅ Mesma |
| **Região** | `var.aws_region` | ✅ Mesma variável |
| **Provider** | Idêntico | ✅ Idêntico |
| **VPC CIDR** | 10.0.0.0/16 | 10.1.0.0/16 (evitar conflito) |
| **Tags** | Project: devops-bootcamp | ✅ Idênticas |

## 🚀 Executar Ambos os Projetos

### Inicializar os Dois

```bash
# EKS
cd infra/terraform/aws-eks
terraform init

# EC2 WordPress
cd infra/terraform/aws-ec2-wordpress
terraform init
```

### Aplicar Ambos (Sequencial)

```bash
# Primeiro EKS
cd infra/terraform/aws-eks
terraform apply

# Depois EC2 WordPress (usa credenciais do mesmo usuário AWS)
cd infra/terraform/aws-ec2-wordpress
terraform apply
```

## ⚙️ Configuração de Credenciais

Ambos os projetos heredam credenciais do:

1. **Variáveis de ambiente AWS:**
   ```bash
   export AWS_ACCESS_KEY_ID=xxxxx
   export AWS_SECRET_ACCESS_KEY=xxxxx
   export AWS_DEFAULT_REGION=us-east-1
   ```

2. **Arquivo `~/.aws/credentials`:**
   ```ini
   [default]
   aws_access_key_id = xxxxx
   aws_secret_access_key = xxxxx
   ```

3. **Arquivo `~/.aws/config`:**
   ```ini
   [default]
   region = us-east-1
   ```

## 📊 Recursos Provisionados

### EKS Project
- VPC (10.0.0.0/16)
- NAT Gateway
- EKS Cluster
- Node Groups
- Security Groups
- IAM Roles

### EC2 WordPress Project
- VPC (10.1.0.0/16)
- Internet Gateway
- EC2 Instance (t3.medium)
- Apache 2
- MySQL
- WordPress
- Security Groups

## ✅ Vantagens da Estrutura Unificada

1. **Messsma conta AWS**: Ambos usam as mesmas credenciais
2. **Fácil manutenção**: Padrão consistente em ambos os projetos
3. **Escalabilidade**: Adicione mais projetos com a mesma estrutura
4. **Segurança**: Tags e organização padronizadas
5. **Multi-ambiente**: Suporte para dev/staging/prod via `terraform.tfvars`

## 🔀 Coexistência

Os dois projetos **podem coexistir** na mesma conta AWS porque:
- ✅ VPCs em CIDR diferentes (10.0.0.0/16 vs 10.1.0.0/16)
- ✅ Nomes de recursos diferentes (`devops-bootcamp-eks` vs `devops-bootcamp-wordpress`)
- ✅ Security Groups separados
- ✅ Estados Terraform independentes

## 🗑️ Destruir Infraestrutura

```bash
# Destruir EC2 WordPress (sem dependências)
cd infra/terraform/aws-ec2-wordpress
terraform destroy

# Destruir EKS
cd infra/terraform/aws-eks
terraform destroy
```

## 📝 Próximas Etapas (Sugestões)

1. **Configurar Remote State**: Use S3 + DynamoDB para state remoto compartilhado
2. **CI/CD**: Integre com Jenkins para deploy automático
3. **Monitoring**: Adicione CloudWatch + CloudTrail para ambos os projetos
4. **Backup**: Implemente snapshots EBS automáticos
5. **Sincronização RDS**: Adicione banco de dados RDS gerenciado ao EC2

## 📞 Contato / Suporte

- Projeto: devops-bootcamp
- Owner: pos-graduacao
- Documentação: [./README.md](./README.md)
