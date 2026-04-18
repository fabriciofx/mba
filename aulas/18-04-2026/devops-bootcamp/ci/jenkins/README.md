# Jenkins (local)

## Objetivo
Rodar um Jenkins localmente com Docker-in-Docker (DIND) para build/push de imagens e `kubectl` para deploy no cluster `kind`.

## Passos
1) Crie o cluster e gere o kubeconfig do Jenkins:
```powershell
cd devops-bootcamp
.\scripts\bootstrap-local.ps1
```
2) Suba o Jenkins:
```powershell
docker compose -f .\ci\jenkins\docker-compose.yml up -d --build
```

## Observações
- O arquivo `ci/jenkins/.local/kubeconfig.yaml` é gerado localmente e não deve ser commitado.
