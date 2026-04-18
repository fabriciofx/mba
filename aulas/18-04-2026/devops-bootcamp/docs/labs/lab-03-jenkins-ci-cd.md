# Lab 03 — Jenkins (CI/CD local)

## Objetivo
Subir Jenkins localmente e executar um pipeline que: testa, builda imagem, publica no registry e faz deploy no Kubernetes.

## Passos (modo “local”)
1) Garantir cluster e kubeconfig do Jenkins:
```powershell
cd devops-bootcamp
.\scripts\bootstrap-local.ps1
```
2) Subir Jenkins:
```powershell
cd devops-bootcamp
docker compose -f .\ci\jenkins\docker-compose.yml up -d --build
```
3) Acessar Jenkins:
- URL: `http://localhost:8080`
- Senha inicial: ver logs do container (`docker logs bootcamp-jenkins`)

4) Criar job:
- Tipo: Pipeline
- Definição: “Pipeline script from SCM”
- Caminho: `ci/jenkins/Jenkinsfile`

5) Executar pipeline e validar:
- Imagem enviada ao registry local
- Deployment atualizado no namespace `todo`

## Entrega
- Pipeline com stages claros e falha rápida.
- (Opcional) Stage de aprovação manual antes do deploy.
