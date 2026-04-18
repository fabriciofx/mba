# 🚀 Guia de Acesso - Express.js Application

Instruções completas para acessar e gerenciar a aplicação Express.js após o deployment.

## 📋 Após Executar `terraform apply`

Você receberá outputs semelhantes a:

```
wordpress_url = "http://54.123.45.67"
instance_public_ip = "54.123.45.67"
ssh_command = "ssh -i /path/to/key.pem ubuntu@54.123.45.67"
```

## 🌍 Acessar a Aplicação Express

### Opção 1: Homepage da Aplicação

```
URL: http://<IP-PUBLICO>
Exemplo: http://54.123.45.67
```

### Opção 2: Health Check

```
URL: http://<IP-PUBLICO>/health
Exemplo: http://54.123.45.67/health

Retorna JSON com status de saúde da aplicação
```

### Opção 3: API Info

```
URL: http://<IP-PUBLICO>/api/info
Exemplo: http://54.123.45.67/api/info

Retorna informações técnicas do Node.js e servidor
```

### Opção 4: Usar curl

```bash
# Terminal do seu computador
curl http://<IP-PUBLICO>
curl http://<IP-PUBLICO>/health
curl http://<IP-PUBLICO>/api/info
```

### Opção 5: Obter URL via Terraform

```bash
# Terminal - do diretório do projeto
cd infra/terraform/aws-ec2-wordpress

# Mostrar URL
terraform output wordpress_url

# Mostrar IP público
terraform output instance_public_ip
```

## 🖥️ Acessar via SSH

### Conectar à Instância

```bash
# Substituir pelo seu IP
ssh -i /path/to/key.pem ubuntu@54.123.45.67

# Ou usar o comando do Terraform
terraform output -raw ssh_command
```

### Verificar Aplicação Express

```bash
# Dentro da instância SSH

# Ver status do serviço
sudo systemctl status express-app

# Ver logs da aplicação
sudo tail -f /var/log/express-app/app.log

# Testar aplicação localmente
curl http://localhost:3000
curl http://localhost:3000/health

# Ver status Nginx (reverse proxy)
sudo systemctl status nginx

# Ver logs Nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## 🔍 Arquitetura da Aplicação

```
Internet (Port 80)
        ↓
    [Nginx]  (reverse proxy)
        ↓
Express.js (Port 3000)
        ↓
[Responses JSON/HTML]
```

## 📊 Endpoints Disponíveis

| Método | Endpoint | Descrição | Resposta |
|--------|----------|-----------|----------|
| GET | `/` | Homepage da aplicação | JSON com info de app |
| GET | `/health` | Health check | JSON com status de saúde |
| GET | `/api/info` | Informações técnicas | JSON com info de Node/Sistema |
| GET | `/*` | Qualquer outro | 404 JSON |

## 📝 Exemplos de Respostas

### GET /

```json
{
  "message": "DevOps Bootcamp - Express.js Application",
  "environment": "production",
  "timestamp": "2024-04-18T12:34:56.789Z",
  "uptime": 3600.123
}
```

### GET /health

```json
{
  "status": "healthy",
  "timestamp": "2024-04-18T12:34:56.789Z",
  "uptime": 3600.123,
  "memory": {
    "rss": 52391936,
    "heapTotal": 12884901,
    "heapUsed": 8388608,
    "external": 0,
    "arrayBuffers": 0
  }
}
```

### GET /api/info

```json
{
  "app": "DevOps Bootcamp Express",
  "version": "1.0.0",
  "node_version": "v20.10.0",
  "platform": "linux",
  "uptime": 3600.123
}
```

## 🔧 Gerenciar a Aplicação

### Via SSH na Instância

```bash
# Iniciar aplicação
sudo systemctl start express-app

# Parar aplicação
sudo systemctl stop express-app

# Reiniciar aplicação
sudo systemctl restart express-app

# Ver status
sudo systemctl status express-app

# Ver logs em tempo real
sudo journalctl -u express-app -f

# Ver últimas 50 linhas
sudo journalctl -u express-app -n 50
```

### Gerenciar Nginx

```bash
# Reiniciar Nginx
sudo systemctl restart nginx

# Testar configuração
sudo nginx -t

# Ver status
sudo systemctl status nginx
```

## 📦 Estrutura de Arquivos na Instância

```
/opt/express-app/
├── package.json           # Dependências do projeto
├── server.js              # Servidor Express
├── node_modules/          # Dependências instaladas
├── public/
│   └── index.html         # Página HTML estática
└── package-lock.json      # Lock de versões

/etc/systemd/system/
└── express-app.service    # Serviço systemd

/var/log/express-app/
├── app.log                # Log da aplicação
└── error.log              # Log de erros

/etc/nginx/
├── sites-available/
│   └── express-app        # Configuração Nginx
└── sites-enabled/
    └── express-app -> ../sites-available/express-app
```

## 🔄 Variáveis de Ambiente

No arquivo `/etc/systemd/system/express-app.service`:

```bash
NODE_ENV=production        # Ambiente (development|staging|production)
PORT=3000                  # Porta da aplicação
```

Para mudar:
```bash
sudo nano /etc/systemd/system/express-app.service
# Editar variáveis
sudo systemctl daemon-reload
sudo systemctl restart express-app
```

## 🆘 Troubleshooting

### Aplicação não responde

```bash
# SSH na instância
ssh -i /path/to/key.pem ubuntu@<IP>

# Verificar se está rodando
sudo systemctl is-active express-app

# Se não, iniciar
sudo systemctl start express-app

# Verificar logs
sudo journalctl -u express-app -n 50

# Testar localmente
curl http://localhost:3000
```

### Nginx não está redirecionando

```bash
# Testar configuração Nginx
sudo nginx -t

# Se houver erro, ver detalhes
sudo nginx -T

# Reiniciar
sudo systemctl restart nginx

# Testar acesso
curl -v http://localhost
```

### Porta 80 não está respondendo

```bash
# Verificar se algo está usando a porta
sudo lsof -i :80

# Verificar regras de firewall (security group)
# Via AWS Console ou CLI
aws ec2 describe-security-groups --group-ids <SG-ID>
```

### Aplicação iniciou mas está lenta

```bash
# Verificar uso de CPU/Memória
top

# Sair do top
q

# Verificar uptime da aplicação
curl http://localhost:3000

# Reiniciar se necessário
sudo systemctl restart express-app
```

## 📊 Monitoramento Básico

```bash
# Ver logs em tempo real (últimas 10 linhas)
sudo tail -f /var/log/express-app/app.log

# Ver status de processos
ps aux | grep node

# Ver conexões ativas
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :3000

# Ver espaço em disco
df -h

# Ver uso de memória
free -h
```

## 🔐 Segurança

### Restrições de Access

Por padrão, as portas abertas são:
- SSH (22): 0.0.0.0/0
- HTTP (80): 0.0.0.0/0
- HTTPS (443): 0.0.0.0/0

Para produção:
1. Restringir SSH a IP específico
2. Usar HTTPS com SSL/TLS
3. Configurar WAF (Web Application Firewall)
4. Manter Express.js atualizado

### Atualizar Dependências

```bash
# SSH na instância
cd /opt/express-app

# Verificar atualizações
npm outdated

# Atualizar
npm update

# Instalar versão específica
npm install express@latest

# Reiniciar aplicação
sudo systemctl restart express-app
```

## 📈 Próximas Etapas

1. **Configurar SSL/TLS**
   - Usar Let's Encrypt com Certbot
   - Redirecionar HTTP para HTTPS

2. **Adicionar Load Balancing**
   - Usar AWS Application Load Balancer
   - Múltiplas instâncias com Auto Scaling

3. **Implementar Logging**
   - CloudWatch Logs
   - Log aggregation (ELK Stack)

4. **Adicionar Monitoramento**
   - CloudWatch Metrics
   - Alertas para CPU/Memória

5. **Database**
   - Adicionar RDS (PostgreSQL/MySQL)
   - Redis para cache

6. **CI/CD**
   - Integrar com Jenkins
   - Deploy automático

## 📞 URLs Importantes

| Função | URL |
|--------|-----|
| **Homepage** | `http://<IP>` |
| **Health** | `http://<IP>/health` |
| **Info** | `http://<IP>/api/info` |
| **AWS Docs** | https://docs.aws.amazon.com/ |
| **Express** | https://expressjs.com |
| **Node.js** | https://nodejs.org |

## 💡 Dicas

- Usar PM2 para múltiplas workers de Node.js
- Configurar log rotation para gerenciar tamanho
- Fazer backup de configurações customizadas
- Manter Node.js atualizado
- Monitorar uso de memória

---

**Versão:** 1.0 | **Última atualização:** 2024
