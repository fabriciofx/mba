# 🚀 GUIA DE DEPLOYMENT - EC2 WordPress

Instruções passo-a-passo para fazer deploy do WordPress em diferentes ambientes.

## 📋 Pré-requisitos

```bash
# 1. Testar credenciais AWS
aws sts get-caller-identity

# 2. Verificar Terraform
terraform --version

# 3. Verificar se está no diretório correto
pwd
# Deve estar em: infra/terraform/aws-ec2-wordpress
```

## 🛠️ Setup Inicial (Uma única vez)

```bash
cd infra/terraform/aws-ec2-wordpress

# Inicializar Terraform
terraform init

# Validar configuração
terraform validate
```

## 🏗️ Deploy - Ambiente Development

Para desenvolvimento/testes rápidos:

```bash
# Usar arquivo de desenvolvimento
cp terraform.dev.tfvars terraform.tfvars

# Visualizar plano (IMPORTANTE!)
terraform plan

# Revisar output e verificar se tudo está correto

# Aplicar (criar infraestrutura)
terraform apply

# Aguardar conclusão (5-10 minutos)
```

**Após deployment:**
```bash
# Obter informações
terraform output

# Copiar IP público
IP=$(terraform output -raw instance_public_ip)

# Testar acesso
curl http://$IP

# Acessar no navegador
open http://$IP/wp-admin
# User: dev_admin
# Pass: DevWP@2024
```

## 🎯 Deploy - Ambiente Staging

Para testes pré-produção:

```bash
# Usar arquivo de staging (CÓPIA do dev)
cp terraform.staging.tfvars terraform.tfvars

# Revisar mudanças
terraform plan -out staging.tfplan

# Revisar cuidadosamente

# Aplicar
terraform apply staging.tfplan

# Aguardar conclusão (5-10 minutos)
```

**Diferenças do dev:**
- Instância t3.medium (vs. t3.small)
- Armazenamento 30GB (vs. 15GB)
- Espelho da produção para testes realistas

## 🔴 Deploy - Ambiente Produção

⚠️ **Criticamente importante!**

>>> **NÃO USE SENHAS PADRÃO EM PRODUÇÃO!** <<<

```bash
# 1. GERAR SENHAS FORTES
export ADMIN_PASS=$(openssl rand -base64 18)
export DB_PASS=$(openssl rand -base64 18)
echo "Admin Password: $ADMIN_PASS"
echo "Database Password: $DB_PASS"

# 2. EDITAR CONFIG PRODUÇÃO
nano terraform.prod.tfvars

# Alterar:
# wordpress_admin_password = "$ADMIN_PASS"
# wordpress_db_password = "$DB_PASS"

# 3. USAR ARQUIVO PRODUÇÃO
cp terraform.prod.tfvars terraform.tfvars

# 4. PLANEJAR (revisar MUITO cuidadosamente)
terraform plan -out prod.tfplan

# ⚠️ IMPORTANTE: Revisar tudo antes de aplicar

# 5. APLICAR COM CONFIRMAÇÃO
terraform apply prod.tfplan

# 6. Aguardar conclusão (10-15 minutos)
```

**Após deployment produção:**
```bash
# Salvar outputs em arquivo seguro
terraform output > prod-outputs.txt
chmod 600 prod-outputs.txt

# Documentar senhas (em local seguro!)
# - Admin user e senha
# - Database user e senha
# - IP público
# - URLs importantes

# Configurar Domínio
# 1. Apontar DNS para IP público
# 2. Acessar WordPress Admin
# 3. Settings > General
# 4. Mudar WordPress Address e Site Address para domínio

# Instalar SSL (Let's Encrypt)
# 1. SSH na instância
# 2. Instalar Certbot: sudo apt install certbot python3-certbot-apache
# 3. Gerar certificado: sudo certbot --apache -d seudominio.com
# 4. Reiniciar Apache: sudo systemctl restart apache2
```

## 📊 Comparação dos Ambientes

```
Desenvolvimento:
├─ Instância: t3.small ($0.0208/h)
├─ Armazenamento: 15GB
├─ Tempo deploy: ~5 min
├─ Custo/mês: ~$5
└─ Uso: Testes, experimentação

Staging:
├─ Instância: t3.medium ($0.0416/h)
├─ Armazenamento: 30GB
├─ Tempo deploy: ~7 min
├─ Custo/mês: ~$12
└─ Uso: Validação pré-prod

Produção:
├─ Instância: t3.large ($0.0832/h)
├─ Armazenamento: 100GB
├─ Tempo deploy: ~10 min
├─ Custo/mês: ~$35
└─ Uso: Servidor em produção
```

## 🔄 Atualizações e Mudanças

### Alterar tipo de instância (dev → staging)

```bash
# 1. Alterar terraform.tfvars
sed -i 's/t3.small/t3.medium/' terraform.tfvars

# 2. Planejar
terraform plan

# 3. Revisar (vai destruir e recriar)

# 4. Aplicar
terraform apply -auto-approve
```

### Aumentar Armazenamento

```bash
# 1. Alterar size
sed -i 's/storage_size = 15/storage_size = 30/' terraform.tfvars

# 2. Planejar (será criado novo volume)
terraform plan

# 3. Aplicar
terraform apply

# 4. SSH na instância para redimensionar partição
ssh -i ~/.ssh/key.pem ubuntu@<IP>
sudo growpart /dev/xvda 1
sudo resize2fs /dev/xvda1
df -h
```

## 🧹 Desfazer Deploy

### Destruir Environment Específico

```bash
# Development
rm terraform.tfvars
cp terraform.dev.tfvars terraform.tfvars
terraform destroy

# Staging
rm terraform.tfvars
cp terraform.staging.tfvars terraform.tfvars
terraform destroy

# Production
rm terraform.tfvars
cp terraform.prod.tfvars terraform.tfvars
terraform destroy -auto-approve  # Não fazer sem confirmação!
```

### Remover Apenas Alguns Recursos

```bash
# Remover Security Group (mantém instância)
terraform state rm aws_security_group.wordpress_sg
terraform destroy -auto-approve

# Remover instância (mantém VPC)
terraform state rm aws_instance.wordpress
terraform destroy -auto-approve
```

## 🔍 Monitoramento Pós-Deploy

### Verificar Saúde da Instância

```bash
# Status na AWS
aws ec2 describe-instance-status --instance-ids <ID>

# Verificar via SSH
ssh -i ~/.ssh/key.pem ubuntu@<IP>
sudo systemctl status apache2
sudo systemctl status mysql

# Ver espaço em disco
df -h

# Ver uso de memória
free -h

# Ver processos
top -b -n 1 | head -20
```

### Verificar WordPress

```bash
# Acessar admin
curl -s http://<IP>/wp-admin | head -20

# Testar página inicial
curl -s http://<IP> | grep -i wordpress

# Verificar banco de dados
mysql -u wordpress -pWordPressDB@2024 -e "SELECT COUNT(*) FROM wordpress.wp_users;"
```

## 📈 Escalability - Próximos Passos

Quando pronto para escalar:

```bash
# 1. Adicionar RDS para database
#    - Melhor performance
#    - Backups automáticos
#    - Multi-AZ failover

# 2. Adicionar Load Balancer
#    - Distribuição de tráfego
#    - Health checks
#    - SSL termination

# 3. Auto Scaling Group
#    - Escala automática baseada em CPU/memória
#    - Múltiplas instâncias

# 4. CloudFront
#    - CDN global
#    - Cache de conteúdo estático
#    - Proteção DDoS

# 5. RDS Multi-AZ
#    - Alta disponibilidade
#    - Failover automático
#    - Mais caro mas mais confiável
```

## 🆘 Troubleshooting

### WordPress não carrega

```bash
# 1. Verificar se instância está saudável
aws ec2 describe-instance-status --instance-ids <ID>

# 2. Verificar apache
ssh -i ~/.ssh/key.pem ubuntu@<IP>
sudo systemctl restart apache2
sudo systemctl status apache2

# 3. Ver logs
tail -f /var/log/apache2/error.log
tail -f /var/log/apache2/access.log

# 4. Verificar MySQL
sudo systemctl restart mysql
mysql -u wordpress -pWordPressDB@2024 -e "SELECT 1;"
```

### Não consegue SSH

```bash
# 1. Verificar security group
aws ec2 describe-security-groups --filters Name=vpc-id,Values=<VPC-ID>

# 2. Adicionar sua IP
aws ec2 authorize-security-group-ingress \
  --group-id <SG-ID> \
  --protocol tcp \
  --port 22 \
  --cidr $(curl -s https://api.ipify.org)/32

# 3. Verificar key pair
ls -la ~/.ssh/key.pem
chmod 400 ~/.ssh/key.pem
```

### Erro de custo/cotas

```bash
# Verificar custos estimados
aws ec2 describe-instances --instance-ids <ID> --query 'Reservations[0].Instances[0].InstanceType'

# Considerar:
# - Downscale de tipos de instância
# - Usar Reserved Instances para produção
# - Configurar budget alerts
```

## 📝 Checklist Pré-Deploy

- [ ] AWS credentials configuradas
- [ ] Terraform validado (`terraform validate`)
- [ ] Plano revisado (`terraform plan`)
- [ ] CIDR ranges não conflitam
- [ ] Senhas fortes (produção)
- [ ] Ambiente correto selecionado (dev/staging/prod)
- [ ] Backup de estado anterior (se atualizar)
- [ ] Documentação atualizada
- [ ] Teste SSH funciona
- [ ] Teste WordPress funciona

## ✅ Checklist Pós-Deploy

- [ ] Instância em execução
- [ ] IP público atribuído (se necessário)
- [ ] SSH funciona
- [ ] WordPress acessível
- [ ] WP-Admin funciona
- [ ] Banco de dados integro
- [ ] Outputs salvos
- [ ] Documentação atualizada
- [ ] Senhas armazenadas com segurança
- [ ] Backups configurados

---

**Versão:** 1.0 | **Última atualização:** 2024

Para mais detalhes, consulte [README.md](./README.md) e [EXEMPLOS_DE_USO.md](./EXEMPLOS_DE_USO.md)
