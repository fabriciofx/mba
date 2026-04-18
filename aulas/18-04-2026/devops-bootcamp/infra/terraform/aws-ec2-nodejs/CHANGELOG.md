# 📝 Changelog - WordPress → Express.js

Documentação das mudanças realizadas ao converter o projeto de WordPress para Express.js/Node.js.

## 🔄 Resumo das Mudanças

**Data:** Abril 18, 2026  
**Versão Anterior:** 1.0 (WordPress)  
**Versão Atual:** 2.0 (Express.js)  
**Status:** ✅ Completo e Pronto para Deploy

---

## 📋 Mudanças Detalhadas

### 1. user_data.sh

**Antes:** Script para instalar WordPress + Apache + MySQL
**Depois:** Script para instalar Node.js LTS + Express.js + Nginx

#### Principais Mudanças:
- ❌ Removido: Apache2, PHP, MySQL
- ✅ Adicionado: Node.js LTS, npm, Express.js
- ✅ Adicionado: Nginx como reverse proxy (porta 80)
- ✅ Adicionado: Systemd service para gerenciar Express
- ✅ Adicionado: Página HTML estática
- ✅ Adicionado: Endpoints HTTP (/, /health, /api/info)

### 2. variables.tf

**Removidas:**
```hcl
# WordPress variables
wordpress_admin_user
wordpress_admin_password
wordpress_db_name
wordpress_db_user  
wordpress_db_password
```

**Adicionadas:**
```hcl
# Express variables
node_port        = 3000
node_env         = "development"
```

### 3. main.tf

**Mudança na função user_data:**

```hcl
# Antes:
user_data = base64encode(templatefile("${path.module}/user_data.sh", {
    db_name, db_user, db_password, wp_admin, wp_password, APACHE_LOG_DIR
}))

# Depois:
user_data = file("${path.module}/user_data.sh")
```

**Razão:** Express.js não precisa de variáveis de template; usa valores padrão.

### 4. terraform.tfvars

**Antes:**
```hcl
instance_name = "devops-bootcamp-wordpress"
wordpress_admin_user = "admin"
wordpress_admin_password = "BootcampWP@2024"
wordpress_db_name = "wordpress"
...
```

**Depois:**
```hcl
instance_name = "devops-bootcamp-express"
node_port = 3000
node_env = "development"
```

### 5. Arquivos de Ambiente

#### terraform.dev.tfvars
- Nome da instância: `wordpress-dev` → `express-dev`
- Removidas todas as credenciais WordPress
- Adicionadas variáveis Node.js

#### terraform.staging.tfvars
- Nome da instância: `wordpress-staging` → `express-staging`
- Mesmas mudanças do dev

#### terraform.prod.tfvars
- Nome da instância: `wordpress-prod` → `express-prod`
- Região: mantida (`us-west-2`)
- Tipo: mantido (`t3.large`)

### 6. README.md

**Completamente reescrito:**
- ~~WordPress~~ → **Express.js**
- ~~Apache~~ → **Nginx**
- ~~MySQL~~ → **Node.js**
- ~~WP-Admin~~ → **REST API endpoints**

### 7. Novas Documentações

**Adicionadas:**
- ✅ `ACESSO_EXPRESS.md` - Guia completo de acesso
- ✅ `QUICKSTART.md` - Deploy em 5 minutos
- ✅ `CHANGELOG.md` - Este arquivo

**Mantidas (desatualizadas):**
- ⚠️  `ACESSO_WORDPRESS.md` - Obsoleto
- ⚠️  `DEPLOYMENT_GUIDE.md` - Obsoleto
- ⚠️  `EXEMPLOS_DE_USO.md` - Obsoleto

---

## 🔧 Especificações Técnicas

| Aspecto | WordPress | Express.js |
|---------|-----------|-----------|
| **Runtime** | Apache + PHP | Node.js LTS |
| **Framework** | WordPress | Express.js 4.18.2 |
| **Banco de Dados** | MySQL local | Nenhum (stateless) |
| **Reverse Proxy** | Built-in Apache | Nginx (80 → 3000) |
| **Gerenciamento** | WP-Admin | Systemd service |
| **Logs** | Apache logs | Systemd journal + arquivos |
| **Porta Aplicação** | 80 (direto) | 3000 (via Nginx) |
| **Endpoints** | `/wp-admin`, `/` | `/`, `/health`, `/api/info` |

---

## 🔐 Credenciais e Segurança

### Mudanças de Segurança

**WordPress:**
```bash
- SSH acesso aberto (0.0.0.0/0)
- HTTP aberto (0.0.0.0/0)
- MySQL local (3306 apenas VPC)
- Senhas padrão em terraform.tfvars
```

**Express.js:**
```bash
- SSH acesso aberto (0.0.0.0/0) [igual]
- HTTP aberto (0.0.0.0/0) [igual]
- Sem banco de dados
- Stateless (ideal para escalabilidade)
- Mais fácil de integrar com RDS/ElastiCache no futuro
```

---

## 📊 Impacto em Infraestrutura

### Recursos AWS (sem mudanças)

✅ EC2 Instance (mesmos tipos: t3.small/medium/large)
✅ VPC (10.1.0.0/16)
✅ Subnet Public
✅ Internet Gateway
✅ Security Groups (mesmas portas)
✅ EBS Volume (mesmos tamanhos)

### Cobrança AWS (sem mudanças)

| Item | Antes | Depois | Mudança |
|------|-------|--------|---------|
| EC2 (t3.medium) | $0.0416/h | $0.0416/h | ✅ Igual |
| EBS (20GB) | $0.10/mês | $0.10/mês | ✅ Igual |
| IGW | $0.032/h | $0.032/h | ✅ Igual |
| **Total/mês** | **~$30** | **~$30** | **✅ Igual** |

---

## 🚀 Como Fazer Upgrade

### Passo 1: Backup
```bash
# Salvar estado anterior
terraform state pull > backup-wordpress.json
```

### Passo 2: Substituir Arquivos
```bash
# Atualizar main.tf, variables.tf, user_data.sh
# Usar novas versões
```

### Passo 3: Validar
```bash
terraform validate
```

### Passo 4: Recriar Instância
```bash
# Marcar para recriação
terraform taint aws_instance.wordpress

# Ver o que será mudado
terraform plan

# Aplicar
terraform apply
```

### Passo 5: Testar
```bash
# Aguardar 5-10 minutos
curl http://<IP>/
curl http://<IP>/health
curl http://<IP>/api/info
```

---

## ✨ Benefícios da Mudança

### Vantagens do Express.js vs WordPress

| Aspecto | WordPress | Express.js |
|---------|-----------|-----------|
| **Performance** | Mais lento | Mais rápido |
| **Memory** | 150-300MB | 50-100MB |
| **Startup** | ~30seg | ~2seg |
| **Escalabilidade** | Complexa | Simples (stateless) |
| **Database** | Obrigatório | Opcional |
| **Customização** | Plugins | Código direto |
| **Learning Curve** | Médio | Fácil |
| **DevOps** | Mais ferramentas | Minimal |

### Casos de Uso Ideais

**WordPress:**
- Blogs/CMS
- Sites estáticos com admin
- Plugins/Themes prontos

**Express.js:**
- APIs REST
- Aplicações customizadas
- Microserviços
- Prototipagem rápida
- Aplicações em tempo real

---

## 🔄 Rollback

Se precisar voltar para WordPress:

```bash
# Restaurar estado anterior
terraform state push backup-wordpress.json

# Ou destruir e recriar com código antigo
git checkout v1.0-wordpress
terraform apply
```

---

## 📚 Documentação Relacionada

- [README.md](./README.md) - Visão geral do projeto
- [ACESSO_EXPRESS.md](./ACESSO_EXPRESS.md) - Guia de acesso
- [QUICKSTART.md](./QUICKSTART.md) - Deploy rápido
- [variables.tf](./variables.tf) - Variáveis disponíveis
- [user_data.sh](./user_data.sh) - Script de inicialização
- [main.tf](./main.tf) - Definição de recursos

---

## 📞 Suporte

**Versão:** 2.0  
**Data:** Abril 2026  
**Projeto:** DevOps Bootcamp  
**Tecnologia:** Terraform + AWS + Node.js + Express.js

Para mais informações, consulte a documentação completa em [README.md](./README.md).

---

**Status:** ✅ Completo | **Data:** 2024-04-18 | **Responsável:** DevOps Bootcamp
