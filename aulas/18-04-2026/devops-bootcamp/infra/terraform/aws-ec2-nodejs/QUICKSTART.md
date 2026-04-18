# 🚀 Quick Start - Express.js Deployment

Guia rápido para fazer deploy da aplicação Express.js em 5 minutos.

## ⚡ Quick Start (5 minutos)

### 1. Navegar para o diretório

```bash
cd infra/terraform/aws-ec2-wordpress
```

### 2. Inicializar Terraform

```bash
terraform init
```

### 3. Validar configuração

```bash
terraform validate
```

### 4. Planejar deployment

```bash
terraform plan
```

### 5. Fazer deploy

```bash
terraform apply

# Ou com auto-approve (sem confirmar)
terraform apply -auto-approve
```

### 6. Aguardar e acessar

```bash
# Aguarde 5-10 minutos enquanto é inicializado

# Ver outputs
terraform output

# Obter URL
terraform output -raw wordpress_url

# Acessar no navegador
# http://<IP-PUBLICO>
```

## 🎯 Escolher Ambiente

### Development (Mais rápido, mais barato)

```bash
# Usar arquivo de desenvolvimento
cp terraform.dev.tfvars terraform.tfvars
terraform apply
```

**Características:**
- Instância t3.small
- ~$5/mês
- Armazenamento: 15GB

### Staging (Teste realista)

```bash
# Usar arquivo de staging
cp terraform.staging.tfvars terraform.tfvars
terraform apply
```

**Características:**
- Instância t3.medium
- ~$12/mês
- Armazenamento: 30GB

### Production (Robusto)

```bash
# ⚠️  Avisar muita atenção
# Usar arquivo de production
cp terraform.prod.tfvars terraform.tfvars
terraform apply
```

**Características:**
- Instância t3.large, região us-west-2
- ~$35/mês
- Armazenamento: 100GB

## 📊 O que é Criado

✅ VPC com sua própria subnet
✅ Internet Gateway para acesso
✅ EC2 Instance (Ubuntu 22.04 LTS)
✅ Node.js LTS instalado
✅ Express.js framework
✅ Nginx como reverse proxy
✅ Systemd service para gerenciar app
✅ Logs centralizados

## 🌐 Como Acessar

Após `terraform apply` completo:

```bash
# Obter todas as informações
terraform output

# URL da aplicação
terraform output -raw wordpress_url

# IP para SSH
terraform output -raw instance_public_ip
```

### Via Navegador

```
http://13.223.228.114          # Substituir pelo seu IP
```

### Via SSH

```bash
ssh -i ~/.ssh/your-key.pem ubuntu@13.223.228.114
```

### Via Curl

```bash
curl -s http://13.223.228.114 | jq
curl -s http://13.223.228.114/health | jq
curl -s http://13.223.228.114/api/info | jq
```

## ⏳ Tempo de Deploy

| Etapa | Tempo |
|-------|-------|
| terraform init | < 1 min |
| terraform plan | ~30 seg |
| terraform apply | ~2 min (criar infra) |
| express app init | 5-10 min (nginx + node + app) |
| **Total** | **~20 minutos** |

⚠️ A aplicação leva 5-10 minutos para estar completamente pronta após a instância ser criada.

## 🆘 Se Algo Não Funcionar

### Testar localmente

```bash
# SSH na instância
ssh -i ~/.ssh/your-key.pem ubuntu@<IP>

# Testar Express.js localmente
curl http://localhost:3000

# Testar Nginx localmente
curl http://localhost

# Ver logs
tail -f /var/log/cloud-init-output.log
```

### Reiniciar Tudo

```bash
# SSH na instância
ssh -i ~/.ssh/your-key.pem ubuntu@<IP>

# Reiniciar Express
sudo systemctl restart express-app

# Reiniciar Nginx
sudo systemctl restart nginx

# Verificar status
sudo systemctl status express-app
sudo systemctl status nginx
```

### Destruir (se precisar recomçar)

```bash
# Do seu computador local
terraform destroy

# Ou sem confirmação
terraform destroy -auto-approve
```

## 📖 Documentação Detalhada

- [ACESSO_EXPRESS.md](./ACESSO_EXPRESS.md) - Guia completo de acesso
- [README.md](./README.md) - Documentação do projeto
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Guia de deployment avançado (antigo - para WordPress)

## 🔗 Comandos Úteis

```bash
# Ver estado atual
terraform state list

# Atualizar apenas uma variável
terraform apply -var="node_env=production"

# Ver outputs específico
terraform output instance_public_ip
terraform output wordpress_url

# Planejar sem aplicar
terraform plan -out=tfplan
terraform show tfplan

# Destruir apenas a instância
terraform destroy -target=aws_instance.wordpress

# Recriar instância
terraform taint aws_instance.wordpress
terraform apply
```

## 💰 Estimar Custos

| Componente | Dev | Staging | Prod |
|-----------|-----|---------|------|
| EC2 | $3.60 | $8.99 | $60.32 |
| EBS | $1.50 | $3.00 | $10.00 |
| IGW | $0.32 | $0.32 | $0.32 |
| **Total/mês** | **~$5** | **~$12** | **~$70** |

## ✨ Próximas Etapas

1. **Configurar Domínio**
   - Apontar DNS para IP da instância
   - Configurar SSL com Let's Encrypt

2. **Adicionar Monitoramento**
   - CloudWatch para métricas
   - Alertas para problemas

3. **Backup Automático**
   - EBS Snapshots
   - Backup de código

4. **CI/CD**
   - Integrar com Jenkins
   - Deploy automático de código

---

**Status:** ✅ Pronto para Deploy | **Última atualização:** 2024
