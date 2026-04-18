# Exemplos de Uso - EC2 WordPress

## 📚 Como Customizar seu Deployment

### 1. Alterar Tipo de Instância

Para usar uma instância maior (ex: t3.large):

```bash
# Editar terraform.tfvars
instance_type = "t3.large"  # padrão: t3.medium
```

**Tipos disponíveis e custos:**
- `t3.micro` - $0.0104/hora (1GB RAM) - Somente para teste
- `t3.small` - $0.0208/hora (2GB RAM) - Para desenvolvimento
- `t3.medium` - $0.0416/hora (4GB RAM) - Recomendado
- `t3.large` - $0.0832/hora (8GB RAM) - Para tráfego maior
- `t3.xlarge` - $0.1664/hora (16GB RAM) - Para produção

### 2. Alterar Região AWS

```bash
# Editar terraform.tfvars
aws_region = "us-west-2"  # padrão: us-east-1
```

**Regiões disponíveis:**
- us-east-1 (N. Virginia) - Mais barato
- us-west-2 (Oregon)
- eu-west-1 (Irlanda)
- ap-southeast-1 (Singapura)

### 3. Mudar Armazenamento

```bash
# Editar terraform.tfvars
storage_size = 50  # padrão: 20 GB
storage_type = "gp3"  # gp3 (recomendado) ou gp2, io1

# Tipos de volume disponíveis:
# - gp3: SSD de propósito geral (padrão) - $0.10/GB/mês
# - gp2: SSD mais antigo - $0.10/GB/mês  
# - io1: SSD provisionado para IOPS - $0.125/GB/mês + $0.065/IOPS/mês
```

### 4. Alterar Credenciais do WordPress

```bash
# Editar terraform.tfvars
wordpress_admin_user = "seu_admin_user"
wordpress_admin_password = "SenhaForte@123"
wordpress_db_name = "meu_banco"
wordpress_db_user = "meu_usuario_db"
wordpress_db_password = "SenhaDB@456"
```

⚠️ **Importante:** Gerar senhas fortes!

```bash
# Comando para gerar senha aleatória:
openssl rand -base64 12
```

### 5. Usar Ambiente de Staging

Criar arquivo `terraform.staging.tfvars`:

```hcl
# terraform.staging.tfvars
aws_region              = "us-east-1"
environment             = "staging"
instance_type           = "t3.small"
instance_name           = "devops-bootcamp-wordpress-staging"
storage_size            = 15
wordpress_admin_user    = "staging_admin"
wordpress_admin_password = "StagingWP@2024"
```

Deploy com staging:
```bash
terraform plan -var-file="terraform.staging.tfvars"
terraform apply -var-file="terraform.staging.tfvars"
```

### 6. Usar Ambiente de Produção

Criar arquivo `terraform.production.tfvars`:

```hcl
# terraform.production.tfvars
aws_region              = "us-west-2"
environment             = "production"
instance_type           = "t3.large"
instance_name           = "wordpress-prod"
vpc_cidr                = "10.2.0.0/16"
storage_size            = 100
storage_type            = "io1"
enable_public_ip        = true
wordpress_admin_user    = "prod_admin"
wordpress_db_name       = "wordpress_prod"
```

Deploy com production:
```bash
terraform plan -var-file="terraform.production.tfvars" -out prod.tfplan
terraform apply prod.tfplan
```

## 🔧 Exemplos Avançados

### 1. Usar SSH Key Existente

Por padrão, a instância usa SSH key gerada pela AWS. Para usar uma key existente, adicione ao `main.tf`:

```hcl
resource "aws_instance" "wordpress" {
  # ... configurações existentes ...
  key_name = "minha-key-existente"
}
```

Depois:
```bash
ssh -i /caminho/para/minha-key.pem ubuntu@<IP>
```

### 2. Não Pedir IP Público

Para instância sem IP público (acesso via VPN):

```bash
# terraform.tfvars
enable_public_ip = false
```

### 3. Abrir Acesso Apenas de um IP

Editar `main.tf`:

```hcl
resource "aws_security_group" "wordpress_sg" {
  # ... configurações existentes ...
  
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["203.0.113.0/32"]  # Seu IP público
  }
}
```

Descobrir seu IP:
```bash
curl https://api.ipify.org
```

### 4. Usar Domínio Customizado

Após deploy, configurar no Route 53:

```bash
# Criar registro A apontando para o IP público
aws route53 change-resource-record-sets \
  --hosted-zone-id Z123456 \
  --change-batch '{
    "Changes": [{
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "wordpress.example.com",
        "Type": "A",
        "TTL": 300,
        "ResourceRecords": [{"Value": "10.20.30.40"}]
      }
    }]
  }'
```

Depois, no WordPress:
1. Acessar wp-admin
2. Ir em Settings > General
3. Mudar WordPress Address e Site Address

## 📊 Exemplos de Scenarios

### Scenario 1: Teste Rápido (Mais Barato)

```hcl
# terraform.test.tfvars
instance_type       = "t3.micro"
storage_size        = 10
storage_type        = "gp2"
environment         = "test"
instance_name       = "wordpress-test"
```

**Custo estimado:** ~$1.00/mês

### Scenario 2: Desenvolvimento

```hcl
# terraform.dev.tfvars
instance_type       = "t3.small"
storage_size        = 20
storage_type        = "gp3"
environment         = "development"
instance_name       = "wordpress-dev"
```

**Custo estimado:** ~$5.00/mês

### Scenario 3: Produção com Alta Disponibilidade

Para produção real, considere:

```hcl
# terraform.prod.tfvars
instance_type       = "t3.large"
storage_size        = 100
storage_type        = "io1"
environment         = "production"
instance_name       = "wordpress-prod"
```

**Adicionar ao main.tf:**
- RDS (em vez de MySQL local)
- Load Balancer
- Auto Scaling Group
- Backup automático
- CloudFront CDN
- WAF

## 🔄 Workflow Completo

```bash
# 1. Customizar variáveis
vim terraform.tfvars

# 2. Validar
terraform validate

# 3. Planejar
terraform plan -out=wp.tfplan

# 4. Revisar plano
# Verificar se tudo está correto

# 5. Aplicar
terraform apply wp.tfplan

# 6. Obter outputs
terraform output

# 7. Acessar
IP=$(terraform output -raw instance_public_ip)
open "http://$IP"

# 8. Configurar WordPress
# - Capturar WordPress Admin URL
# - User: wordpress_admin_user
# - Pass: wordpress_admin_password
```

## 🆘 Troubleshooting

### WordPress não carrega

```bash
# 1. SSH na instância
ssh -i /path/to/key.pem ubuntu@<IP>

# 2. Verificar Apache
sudo systemctl status apache2

# 3. Verificar MySQL
sudo systemctl status mysql

# 4. Ver logs
tail -f /var/log/cloud-init-output.log
tail -f /var/log/apache2/error.log

# 5. Reiniciar serviços
sudo systemctl restart apache2
sudo systemctl restart mysql
```

### Erro ao fazer apply

```bash
# Verificar se já existe instância
aws ec2 describe-instances --filters "Name=tag:Name,Values=devops-bootcamp-wordpress"

# Remover antes de recriar
terraform destroy
```

### SSH não funciona

```bash
# Verificar security group
aws ec2 describe-security-groups --filters "Name=tag:Name,Values=*wordpress*"

# Verificar key pair
aws ec2 describe-key-pairs

# Ajustar permissões da chave
chmod 400 ~/.ssh/minha-key.pem
```

## 📝 Comandos Úteis

```bash
# Debugar deployment
terraform apply -lock=false

# Destruir e recriar
terraform destroy -auto-approve && terraform apply -auto-approve

# Formatar código
terraform fmt -recursive

# Validar
terraform validate

# Planejar com saída em arquivo
terraform plan -out=tfplan -lock=false

# Aplicar do arquivo
terraform apply tfplan

# Mostrar recursos
terraform state list

# Inspecionar estado
terraform state show aws_instance.wordpress
```

## 🔐 Segurança - Boas Práticas

```bash
# Nunca commitar terraform.tfvars
git add -f .gitignore
echo "terraform.tfvars" >> .gitignore

# Usar variáveis de ambiente para sensíveis
export TF_VAR_wordpress_admin_password="SenhaForte@123"

# Validar antes de commitar
terraform fmt -check
terraform validate
```

## 📞 Suporte

Para problemas específicos:
1. Verificar logs de cloud-init
2. Consultar documentação do WordPress
3. Verificar Security Groups e Network ACLs
4. Revisar outputs do Terraform

---

**Versão:** 1.0 | **Última atualização:** 2024
