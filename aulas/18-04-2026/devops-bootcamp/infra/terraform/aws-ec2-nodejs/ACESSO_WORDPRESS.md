# 🌐 Guia de Acesso ao WordPress

Instruções completas para acessar o WordPress após o deployment.

## 📋 Após Executar `terraform apply`

Você receberá outputs semelhantes a:

```
wordpress_url = "http://54.123.45.67"
wordpress_admin_url = "http://54.123.45.67/wp-admin"
instance_public_ip = "54.123.45.67"
```

## 🌍 Acessar WordPress via Navegador

### Opção 1: Homepage do WordPress

```
URL: http://<IP-PUBLICO>
Exemplo: http://54.123.45.67
```

### Opção 2: Painel Administrativo

```
URL: http://<IP-PUBLICO>/wp-admin
Exemplo: http://54.123.45.67/wp-admin

Credenciais padrão:
- Usuário: admin (ou wordpress_admin_user customizado)
- Senha: BootcampWP@2024 (ou wordpress_admin_password customizado)
```

### Opção 3: Obter URL via Terraform

```bash
# Terminal - do diretório do projeto
cd infra/terraform/aws-ec2-wordpress

# Mostrar URL
terraform output wordpress_url

# Mostrar URL admin
terraform output wordpress_admin_url

# Mostrar IP público
terraform output instance_public_ip
```

## 🔗 Configuração da URL do WordPress

O WordPress está configurado inicialmente com a URL `http://localhost`. Para mantê-la funcionando com o IP público, há duas opções:

### Opção A: Deixar com IP (padrão)

Não precisa fazer nada, o WordPress vai responder corretamente via IP público.

### Opção B: Configurar com Domínio

Se tiver um domínio próprio:

1. **Apontar DNS para o IP público**
   ```
   Tipo A: seu-dominio.com → 54.123.45.67
   ```

2. **SSH na instância**
   ```bash
   ssh -i /path/to/key.pem ubuntu@54.123.45.67
   ```

3. **Atualizar WordPress**
   ```bash
   # Usar WP-CLI para mudar URL
   wp option update siteurl "http://seu-dominio.com"
   wp option update home "http://seu-dominio.com"
   
   # Verificar
   wp option get siteurl
   wp option get home
   ```

4. **Alterar arquivo WordPress**
   ```bash
   nano /var/www/html/wordpress/wp-config.php
   
   # Adicionar (ou descomentar):
   define('WP_HOME', 'http://seu-dominio.com');
   define('WP_SITEURL', 'http://seu-dominio.com');
   ```

5. **Reiniciar Apache**
   ```bash
   sudo systemctl restart apache2
   ```

## 🔒 HTTPS/SSL - Let's Encrypt

Para usar HTTPS (recomendado em produção):

### 1. SSH na instância

```bash
ssh -i /path/to/key.pem ubuntu@<IP>
```

### 2. Ter um domínio apontado

Necessário ter um domínio real (ex: wordpress.example.com)

### 3. Instalar Certbot

```bash
sudo apt update
sudo apt install -y certbot python3-certbot-apache
```

### 4. Gerar certificado

```bash
sudo certbot --apache -d seu-dominio.com -d www.seu-dominio.com
```

Responder:
- Email: seu-email@example.com
- Aceitar termos: Y
- Compartilhar com EFF: N (ou Y)
- Redirect HTTP para HTTPS: 2 (Redirect)

### 5. Testar renovação automática

```bash
sudo certbot renew --dry-run
```

### 6. Verificar certificado

```bash
https://seu-dominio.com
```

## 📊 Configuração Atual do Apache

**Virtual Host ativado:**
- Nome: wordpress.conf
- Porta: 80 (HTTP)
- DocumentRoot: /var/www/html/wordpress
- Módulos: rewrite, deflate, headers

**Diretivas habilitadas:**
```apache
<VirtualHost *:80>
    ServerName localhost
    ServerAlias *  # Aceita qualquer host
    DocumentRoot /var/www/html/wordpress
    
    # Habilita .htaccess para URLs amigáveis
    <Directory /var/www/html/wordpress>
        AllowOverride All
        RewriteEngine On
        RewriteRule ^index\.php$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.php [L]
    </Directory>
    
    ErrorLog /var/log/apache2/error.log
    CustomLog /var/log/apache2/access.log combined
</VirtualHost>
```

## 🔐 Security Group - Portas Abertas

```
Ingress Rules:
├─ SSH (22) → 0.0.0.0/0
├─ HTTP (80) → 0.0.0.0/0
├─ HTTPS (443) → 0.0.0.0/0
└─ MySQL (3306) → 10.1.0.0/16 (apenas VPC)

Egress Rules:
└─ All traffic → 0.0.0.0/0
```

## 🧪 Testes de Conectividade

### 1. Testar acesso HTTP

```bash
# Do seu computador local
curl http://<IP>
curl http://<IP>/wp-admin

# Deve retornar o HTML do WordPress
```

### 2. Verificar se Apache está rodando

```bash
# SSH na instância
ssh -i /path/to/key.pem ubuntu@<IP>

# Testar localmente
curl http://localhost
sudo systemctl status apache2
```

### 3. Verificar logs

```bash
# Via SSH
ssh -i /path/to/key.pem ubuntu@<IP>

# Acessar logs
tail -f /var/log/apache2/access.log
tail -f /var/log/apache2/error.log
tail -f /var/log/cloud-init-output.log
```

### 4. Verificar WordPress

```bash
# Via SSH
wp db tables  # Listar tabelas
wp user list  # Listar usuários
wp site info  # Info do site
```

## 🚀 Primeiros Passos Após Login

1. **Acessar wp-admin**
   ```
   http://<IP>/wp-admin
   User: admin
   Pass: BootcampWP@2024
   ```

2. **Mudar senha**
   - Dashboard → Users → Seu usuário → Edit
   - New Password → Guardar com segurança

3. **Atualizar informações do site**
   - Settings → General
   - Site Title: Seu título
   - Tagline: Sua descrição

4. **Instalar plugins** (opcional)
   - Plugins → Add New
   - Buscar por "Akismet", "Yoast SEO", etc.

5. **Mudar tema** (opcional)
   - Appearance → Themes
   - Selecionar novo tema

6. **Criar primeira página**
   - Pages → Add New
   - Título: Home
   - Conteúdo: Sua mensagem inicial
   - Publish

7. **Configurar homepage**
   - Settings → Reading
   - A homepage exibe: Uma página estática
   - Homepage: Home (criada acima)
   - Save

## 🐛 Problemas Comuns

### WordPress não carrega

```bash
# SSH na instância
ssh -i /path/to/key.pem ubuntu@<IP>

# Verificar Apache
sudo systemctl restart apache2
sudo systemctl status apache2

# Verificar documentroot
ls -la /var/www/html/wordpress/

# Verificar permissões
sudo chown -R www-data:www-data /var/www/html/wordpress
sudo chmod -R 755 /var/www/html/wordpress
sudo chmod -R 644 /var/www/html/wordpress/*
sudo chmod 755 /var/www/html/wordpress/wp-content /var/www/html/wordpress/wp-content/*
```

### Erro de conexão com banco de dados

```bash
# SSH na instância
ssh -i /path/to/key.pem ubuntu@<IP>

# Testar MySQL
mysql -u wordpress -pWordPressDB@2024 -e "SELECT 1;"

# Verificar wp-config.php
cat /var/www/html/wordpress/wp-config.php | grep "DB_"

# Recuperar senha MySQL
sudo cat /var/log/cloud-init-output.log | grep "wordpress" | grep "CREATE USER"
```

### Páginas retornam 404

Configurar as URLs amigáveis:

```bash
# Via WP-CLI
wp rewrite structure '/%postname%/'
wp rewrite flush

# Ou via wp-admin
Settings → Permalinks → Common → Post name
```

### Erro de permissão no .htaccess

```bash
# SSH na instância
ssh -i /path/to/key.pem ubuntu@<IP>

# Criar e configurar .htaccess
cd /var/www/html/wordpress
sudo -u www-data touch .htaccess
sudo -u www-data chmod 644 .htaccess

# Conteúdo atual (deve estar no arquivo):
cat > .htaccess << 'EOF'
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
# END WordPress
EOF

# Definir permissões corretas
sudo chmod 644 .htaccess
```

## 📞 URLs Importantes

| Função | URL |
|--------|-----|
| **Homepage** | `http://<IP>` |
| **Admin** | `http://<IP>/wp-admin` |
| **Login** | `http://<IP>/wp-login.php` |
| **Configurações** | `http://<IP>/wp-admin/options-general.php` |
| **Posts** | `http://<IP>/wp-admin/edit.php` |
| **Páginas** | `http://<IP>/wp-admin/edit.php?post_type=page` |
| **Plugins** | `http://<IP>/wp-admin/plugins.php` |
| **Temas** | `http://<IP>/wp-admin/themes.php` |

## 💡 Dicas

- Guardar credenciais em local seguro (password manager)
- Fazer backup regular do banco de dados
- Manter WordPress, plugins e temas atualizados
- Usar senhas fortes
- Limitar acesso ao wp-admin por IP (opcional)
- Considerar usar 2FA (Two-Factor Authentication)

## 📊 Fatos Importantes

- **Banco de dados:** MySQL local (não RDS)
- **Servidor web:** Apache 2
- **PHP:** Versão padrão do Ubuntu 22.04
- **Certificado:** Não pré-instalado (use Let's Encrypt)
- **Backup:** Manual (considere adicionar ferramentas de backup)
- **Domínio:** Inicialmente sem domínio (use IP ou configure DNS)

---

**Versão:** 1.0 | **Última atualização:** 2024
