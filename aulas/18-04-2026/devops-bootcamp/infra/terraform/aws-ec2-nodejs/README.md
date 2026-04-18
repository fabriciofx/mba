# EC2 Express.js com Node.js - Terraform

Projeto Terraform para provisionar uma instância EC2 com uma aplicação **Express.js** (Node.js) completamente funcional.

## 📋 Estrutura do Projeto

```
aws-ec2-wordpress/
├── providers.tf              # Configuração do provider AWS
├── variables.tf              # Declaração de variáveis
├── terraform.tfvars          # Valores padrão das variáveis
├── terraform.dev.tfvars      # Configuração desenvolvimento
├── terraform.staging.tfvars  # Configuração staging
├── terraform.prod.tfvars     # Configuração produção
├── main.tf                   # Infraestrutura principal (VPC, EC2, SG)
├── outputs.tf                # Outputs do projeto
├── versions.tf               # Versões do Terraform e providers
├── user_data.sh              # Script de inicialização (Node.js + Express)
├── ACESSO_WORDPRESS.md       # Guia de acesso (antigo - desatualizado)
└── README.md                 # Este arquivo
```

## 🔐 Estrutura de Credenciais

Este projeto utiliza a **mesma estrutura de autenticação** do projeto EKS:

- **AWS Credentials**: Utiliza as credenciais configuradas no ambiente (`~/.aws/credentials` ou variáveis de ambiente)
- **Provider AWS**: Configurado em `providers.tf` com:
  - Região AWS (padrão: us-east-1)
  - Tags padrão para identificação de recursos (Project: devops-bootcamp, Owner: pos-graduacao)

## 📦 Pré-requisitos

- Terraform >= 1.0
- AWS CLI configurado com credenciais
- Permissões IAM para criar: EC2, VPC, Security Groups, S3 (se usar remote state)

## 🚀 Como Usar

### 1. Inicializar Terraform

```bash
cd infra/terraform/aws-ec2-wordpress
terraform init
```

### 2. Validar Configuração

```bash
terraform validate
```

### 3. Visualizar Plano

```bash
terraform plan
```

### 4. Aplicar Configuração

```bash
terraform apply
```

Após a conclusão (aguarde 5-10 minutos para Express estar completamente pronto), será exibido:
- IP público da instância
- URL de acesso à aplicação
- Comando SSH para acessar a instância

### 5. Acessar Aplicação Express

- **Homepage:** `http://<IP-PUBLIC>`
- **Health Check:** `http://<IP-PUBLIC>/health`
- **Info API:** `http://<IP-PUBLIC>/api/info`

## 🔧 Variáveis Personalizáveis

```hcl
aws_region          = "us-east-1"              # Região AWS
instance_type       = "t3.medium"              # Tipo de instância
vpc_cidr            = "10.1.0.0/16"            # CIDR da VPC
storage_size        = 20                       # Tamanho EBS em GB
storage_type        = "gp3"                    # Tipo de volume
enable_public_ip    = true                     # Habilitar IP público
node_port           = 3000                     # Porta da aplicação Express
node_env            = "development"            # Ambiente Node.js
```

## 📝 Recursos Criados

- ✅ **VPC** com CIDR customizável
- ✅ **Subnet Pública** com auto-assign de IP público
- ✅ **Internet Gateway** para roteamento
- ✅ **Route Table** com rota padrão para internet
- ✅ **Security Group** com portas SSH, HTTP, HTTPS aberta
- ✅ **Instância EC2** com Ubuntu 22.04 LTS
- ✅ **Node.js** (versão LTS) instalado
- ✅ **Express.js** framework web
- ✅ **Nginx** como reverse proxy (porta 80 → 3000)
- ✅ **Systemd Service** para gerenciar aplicação
- ✅ **PM2** (opcional) para múltiplas instâncias

## 🔍 Outputs

Após aplicar, os seguintes valores estarão disponíveis:

```bash
terraform output
```

Retorna:
- `instance_id`: ID da instância
- `instance_public_ip`: IP público
- `instance_private_ip`: IP privado
- `wordpress_url`: URL de acesso (raiz)
- `wordpress_admin_url`: URL de acesso (admin - não aplicável para Express)
- `ssh_command`: Comando SSH para acesso

## 🌐 Endpoints Disponíveis

| Endpoint | Descrição |
|----------|-----------|
| `GET /` | Retorna informações da aplicação |
| `GET /health` | Health check da aplicação |
| `GET /api/info` | Informações técnicas do Node.js e servidor |

## 📊 Ambientes

### Development
- Instância: t3.small
- Custo: ~$5/mês
- Uso: Testes e desenvolvimento

### Staging
- Instância: t3.medium
- Custo: ~$12/mês
- Uso: Validação pré-produção

### Production
- Instância: t3.large + região us-west-2
- Custo: ~$35/mês
- Uso: Servidor em produção

## 🆘 Troubleshooting

### Express não está respondendo

```bash
# SSH na instância
ssh -i /path/to/key.pem ubuntu@<IP>

# Verificar logs
tail -f /var/log/express-app/app.log
tail -f /var/log/express-app/error.log

# Verificar status do serviço
sudo systemctl status express-app

# Reiniciar
sudo systemctl restart express-app
```

### Nginx não está funcionando

```bash
# SSH na instância
ssh -i /path/to/key.pem ubuntu@<IP>

# Testar configuração
sudo nginx -t

# Reiniciar
sudo systemctl restart nginx

# Ver logs
sudo tail -f /var/log/nginx/error.log
```

### Erro ao fazer curl

```bash
# Testar localmente na instância
curl http://localhost:3000

# Testar via Nginx
curl http://localhost

# Via IP público
curl http://<IP-PUBLIC>
```

## 📚 Diferenças do Projeto EKS

| Aspecto | EKS | EC2 Express |
|--------|-----|------------|
| Infraestrutura | Kubernetes (EKS) | Aplicação Node.js simples |
| CIDR | 10.0.0.0/16 | 10.1.0.0/16 |
| Providers | Idêntico | Idêntico |
| Autenticação | Mesma estrutura | Mesma estrutura |
| Complexidade | Alta | Baixa |
| Gerenciamento | Kubernetes | Systemd + Nginx |

## 🧹 Destruir Infraestrutura

```bash
terraform destroy
```

## 📚 Referências

- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/)
- [Terraform Best Practices](https://www.terraform.io/docs/cloud/index.html)

## 📊 Arquitetura

```
┌─────────────────────────────────────────┐
│         AWS (us-east-1)                 │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  VPC (10.1.0.0/16)                │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ Subnet (10.1.0.0/24)        │  │  │
│  │  │                             │  │  │
│  │  │  ┌───────────────────────┐  │  │  │
│  │  │  │ EC2 Instance          │  │  │  │
│  │  │  │ (t3.medium)           │  │  │  │
│  │  │  │                       │  │  │  │
│  │  │  │ Ubuntu 22.04          │  │  │  │
│  │  │  │ ├─ Node.js LTS        │  │  │  │
│  │  │  │ ├─ Express.js         │  │  │  │
│  │  │  │ └─ Nginx (proxy)      │  │  │  │
│  │  │  └───────────────────────┘  │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ Security Group              │  │  │
│  │  │ ├─ SSH: 22                  │  │  │
│  │  │ ├─ HTTP: 80                 │  │  │
│  │  │ ├─ HTTPS: 443               │  │  │
│  │  │ └─ Express: 3000 (interno)  │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Internet Gateway → 0.0.0.0/0           │
└─────────────────────────────────────────┘
```

---

**Versão:** 2.0 (Express.js) | **Status:** Pronto para Uso ✅ | **Última atualização:** 2024
