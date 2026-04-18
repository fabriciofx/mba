# Terraform (IaC) - DevOps Bootcamp

## 🎯 Objetivo

Usar Terraform para provisionar infraestrutura na AWS com reforço de práticas de IaC:
- ✅ Reprodutibilidade
- ✅ Revisão de código
- ✅ Gerenciamento de estado
- ✅ Variáveis e outputs
- ✅ Teardown automatizado
- ✅ Estrutura de credenciais compartilhada

## 📁 Projetos Disponíveis

### 1. **AWS EKS** (`aws-eks/`)
Cluster Kubernetes gerenciado com VPC, NAT Gateway e node groups.

**Recursos:**
- VPC com subnets privadas e públicas
- Cluster EKS (última versão LTS)
- Auto-scaling node groups
- Security groups otimizados

**Iniciar:**
```bash
cd aws-eks
terraform init && terraform plan && terraform apply
```

### 2. **AWS EC2 WordPress** (`aws-ec2-wordpress/`)
Instância EC2 com WordPress completamente configurado usando a solução pronta da AWS.

**Recursos:**
- VPC com internet gateway
- EC2 Instance (t3.medium)
- Apache 2 + PHP
- MySQL database
- WordPress com WP-CLI
- Script de inicialização automática

**Iniciar:**
```bash
cd aws-ec2-wordpress
terraform init && terraform plan && terraform apply
```

## 🔐 Estrutura de Credenciais - COMPARTILHADA

Ambos os projetos usam a **mesma estrutura de autenticação AWS**:

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

**Credenciais herdadas de:**
- Variáveis de ambiente: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- Arquivo `~/.aws/credentials`
- Arquivo `~/.aws/config`

## 🚀 Quick Start

### Usando Make (Recomendado)
```bash
# Ver comandos disponíveis
make help

# Inicializar ambos os projetos
make init-all

# Planejar
make plan-all

# Aplicar
make apply-all

# Ver outputs
make output-all

# Destruir (cuidado!)
make destroy-all
```

### Usando Script Interativo
```bash
chmod +x deploy.sh
./deploy.sh
```

### Usando Terraform Direto
```bash
cd aws-eks
terraform init
terraform plan
terraform apply

cd ../aws-ec2-wordpress
terraform init
terraform plan
terraform apply
```

## 📊 Status dos Projetos

| Projeto | Status | CIDR | Banco de Dados | Acesso Público |
|---------|--------|------|----------------|----------------|
| EKS | ✅ Pronto | 10.0.0.0/16 | - | Via kubectl |
| EC2 WordPress | ✅ Pronto | 10.1.0.0/16 | MySQL local | HTTP/HTTPS |

## 📚 Documentação Detalhada

- [aws-eks/README.md](aws-eks/README.md) — Documentação completa do EKS
- [aws-ec2-wordpress/README.md](aws-ec2-wordpress/README.md) — Documentação completa do WordPress
- [ESTRUTURA_CREDENCIAIS.md](ESTRUTURA_CREDENCIAIS.md) — Comparação e configuração de credenciais

## 🔄 Fluxo Recomendado

```bash
# 1. Inicializar
make init-all

# 2. Validar
make validate-all

# 3. Planejar e revisar
make plan-all

# 4. Aplicar
make apply-all

# 5. Monitorar outputs
make output-all

# 6. Testar conectividade
# - EKS: kubectl get nodes
# - WordPress: curl http://<IP>/wp-admin
```

## 🧹 Limpeza

```bash
# Destruir WordPress primeiro (sem dependências)
make destroy-wordpress

# Depois destruir EKS
make destroy-eks

# Ou tudo de uma vez
make destroy-all
```

## ⚠️ Notas Importantes

- **CIDR ranges** não podem se sobrepor:
  - EKS: 10.0.0.0/16
  - WordPress: 10.1.0.0/16
  
- **Credenciais:** Nunca commitar `terraform.tfvars` com dados sensíveis

- **Tempo de deploy:**
  - EKS: 15-20 minutos
  - WordPress: 5-10 minutos

- **Custos:** Use AWS Pricing Calculator para estimar

## 🐛 Troubleshooting

### EKS
```bash
aws eks update-kubeconfig --name devops-bootcamp-eks --region us-east-1
kubectl get nodes
```

### WordPress
```bash
# SSH na instância
ssh -i /path/to/key.pem ubuntu@<IP>

# Verificar logs
tail -f /var/log/cloud-init-output.log
```

## 📞 Informações do Projeto

- **Projeto:** devops-bootcamp
- **Owner:** pos-graduacao
- **Região padrão:** us-east-1
- **Terraform:** >= 1.0
- **AWS Provider:** ~> 5.0

## 📚 Referências

- [Terraform AWS Provider Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS EKS Documentation](https://docs.aws.amazon.com/eks/)
- [WordPress Documentation](https://wordpress.org/support/)
- [Terraform Best Practices](https://www.terraform.io/docs/cloud/index.html)

## 💡 Próximas Etapas (Sugestões)

1. Implementar remote state (S3 + DynamoDB)
2. Adicionar CI/CD pipeline (Jenkins)
3. Configurar monitoring (CloudWatch)
4. Implementar backup automático
5. Adicionar Multi-region support

---

**Status:** ✅ Pronto para Uso | **Versão:** 1.0 | **Última atualização:** 2024

> Para labs 100% locais (kind), foque em `infra/kind/` e no deploy via `k8s/`.
