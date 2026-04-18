#!/bin/bash
set -e

# Atualizar sistema
apt-get update
apt-get upgrade -y

# Instalar dependências
apt-get install -y \
    curl \
    wget \
    git \
    build-essential \
    python3

# Instalar Node.js (versão LTS)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
apt-get install -y nodejs

# Verificar instalação
echo "Node.js version: $(node --version)"
echo "NPM version: $(npm --version)"

# Criar diretório da aplicação
mkdir -p /opt/express-app
cd /opt/express-app

# Criar package.json
cat > package.json << 'EOF'
{
  "name": "devops-bootcamp-express",
  "version": "1.0.0",
  "description": "Express.js application deployed on bootcamp infrastructure",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "keywords": [
    "express",
    "devops",
    "bootcamp"
  ],
  "author": "devops-bootcamp",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2"
  }
}
EOF

# Criar servidor Express
cat > server.js << 'EOF'
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || 'development';

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Rotas
app.get('/', (req, res) => {
    res.json({
        message: 'DevOps Bootcamp - Express.js Application',
        environment: nodeEnv,
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage()
    });
});

app.get('/api/info', (req, res) => {
    res.json({
        app: 'DevOps Bootcamp Express',
        version: '1.0.0',
        node_version: process.version,
        platform: process.platform,
        uptime: process.uptime()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        path: req.path,
        method: req.method
    });
});

// Iniciar servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`======================================`);
    console.log(`Express Server Started`);
    console.log(`Port: ${port}`);
    console.log(`Environment: ${nodeEnv}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`======================================`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    process.exit(0);
});
EOF

# Criar diretório public com página HTML
mkdir -p public
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevOps Bootcamp - Express.js</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            padding: 40px;
            max-width: 600px;
            text-align: center;
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 32px;
        }
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 18px;
        }
        .badge {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            margin: 5px;
            font-size: 14px;
            font-weight: 600;
        }
        .endpoints {
            background: #f5f5f5;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin-top: 30px;
            text-align: left;
            border-radius: 5px;
        }
        .endpoints h3 {
            color: #333;
            margin-bottom: 15px;
        }
        .endpoint {
            background: white;
            padding: 10px 15px;
            margin: 8px 0;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            border-left: 3px solid #667eea;
        }
        .endpoint-method {
            background: #667eea;
            color: white;
            padding: 2px 8px;
            border-radius: 3px;
            font-weight: bold;
            display: inline-block;
            margin-right: 10px;
            font-size: 11px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 DevOps Bootcamp</h1>
        <p class="subtitle">Express.js Application</p>
        
        <div>
            <span class="badge">Node.js</span>
            <span class="badge">Express</span>
            <span class="badge">REST API</span>
        </div>

        <div class="endpoints">
            <h3>📍 Available Endpoints</h3>
            <div class="endpoint">
                <span class="endpoint-method">GET</span> /
            </div>
            <div class="endpoint">
                <span class="endpoint-method">GET</span> /health
            </div>
            <div class="endpoint">
                <span class="endpoint-method">GET</span> /api/info
            </div>
        </div>
    </div>
</body>
</html>
EOF

# Instalar dependências npm
npm install --production

# Criar systemd service para gerenciar aplicação
cat > /etc/systemd/system/express-app.service << 'EOF'
[Unit]
Description=Express.js DevOps Bootcamp Application
After=network.target

[Service]
Type=simple
User=node
WorkingDirectory=/opt/express-app
ExecStart=/usr/bin/node /opt/express-app/server.js
Restart=on-failure
RestartSec=10
StandardOutput=append:/var/log/express-app/app.log
StandardError=append:/var/log/express-app/error.log
Environment="NODE_ENV=production"
Environment="PORT=3000"

[Install]
WantedBy=multi-user.target
EOF

# Criar usuário node se não existir
useradd -r -s /bin/bash node 2>/dev/null || true

# Criar diretório de logs
mkdir -p /var/log/express-app
chown -R node:node /opt/express-app
chown -R node:node /var/log/express-app
chmod 755 /opt/express-app
chmod 755 /var/log/express-app

# Recarregar daemon do systemd
systemctl daemon-reload

# Habilitar e iniciar o serviço
systemctl enable express-app
systemctl start express-app

# Instalar Nginx como reverse proxy
apt-get install -y nginx

# Configurar Nginx como reverse proxy
cat > /etc/nginx/sites-available/express-app << 'EOF'
upstream express_backend {
    server 127.0.0.1:3000;
}

server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;

    location / {
        proxy_pass http://express_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_buffering off;
    }
}
EOF

# Ativar configuração do Nginx
ln -sf /etc/nginx/sites-available/express-app /etc/nginx/sites-enabled/express-app
rm -f /etc/nginx/sites-enabled/default

# Testar configuração do Nginx
if nginx -t > /dev/null 2>&1; then
    systemctl enable nginx
    systemctl start nginx
    echo "Nginx configurado com sucesso"
fi

# Aguardar aplicação iniciar
sleep 2

# Verificar se aplicação está rodando
if systemctl is-active --quiet express-app; then
    echo "Express app está rodando!"
else
    echo "Erro: Express app não iniciou"
    journalctl -u express-app -n 20
fi

echo "Instalação completa!"
echo "Aplicação disponível em: http://$(hostname -I | awk '{print $1}'):80"
